{
  description = "Todai Chat Bot";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  #      it's destructured here 👇
  outputs = { self, nixpkgs, flake-utils }:
    # calling a function from `flake-utils` that takes a lambda
    # that takes the system we're targetting
    flake-utils.lib.eachDefaultSystem (system:
      let
        # no need to define `system` anymore
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        # TODO: complete this
        # `eachDefaultSystem` transforms the input, our output set
        # now simply has `packages.default` which gets turned into
        # `packages.${system}.default` (for each system)
        # packages.default = derivation {
        #   inherit system;
        #   name = "todai-chatbot";
        #   src = ./.;
        #   buildInputs = [ ]; # doesn't work
        #   builder = with pkgs; "${bash}/bin/bash";
        #   args = [ "-c" "go build -t $out ." ];
        # };
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            go
            husky
          ];
          shellHook = ''
            npm ci
            npx husky
          '';
        };
      }
    );
}
