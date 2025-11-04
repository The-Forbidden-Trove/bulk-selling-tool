# shell.nix
{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    yarn
    python3
    python3Packages.requests
  ];
}
