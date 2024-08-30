{
  description = "Todai Chat Bot";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }:
    # calling a function from `flake-utils` that takes a lambda
    # that takes the system we're targetting
    flake-utils.lib.eachDefaultSystem (system:
      let
        # no need to define `system` anymore
        pkgs = nixpkgs.legacyPackages.${system};
      in
      rec {
        # TODO: complete this
        # `eachDefaultSystem` transforms the input, our output set
        # now simply has `packages.default` which gets turned into
        # `packages.${system}.default` (for each system)
        # packages.todai-chatbot-server = {
        #   inherit system;
        #   name = "todai-chatbot server";
        #   src = ./.;
        #   buildInputs = [ ];
        # };

        packages.todai-chatbot-scraper = pkgs.buildGo122Module {
          inherit system;
          name = "todai-chatbot scraper";
          src = ./scraper;
          vendorHash = "sha256-MmwMVWWCukJlRr0Lu75wAi9VDodJZ1CfFOvALp5QmeI=";
        };

        packages.default = packages.todai-chatbot-scraper;

        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            gnumake
            go
            nodejs_22
          ];
          shellHook = ''
            npm ci
            npx husky
          '';
        };
      }
    );
}
