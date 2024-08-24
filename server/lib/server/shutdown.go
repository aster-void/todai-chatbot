package server

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	"github.com/labstack/echo/v4"
)

func StartWithProperShutdown(server *echo.Echo, port uint16) error {
	var ports = ":" + strconv.Itoa(int(port))
	var errch chan error

	go func() {
		err := server.Start(ports)
		if !errors.Is(err, http.ErrServerClosed) {
			errch <- err
		}
		errch <- nil
	}()

	intrpt, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	select {
	case err := <-errch:
		return err
	case <-intrpt.Done():
		timeout, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		return server.Shutdown(timeout)
	}
}
