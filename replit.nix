{pkgs}: {
  deps = [
    pkgs.php83Packages.composer
    pkgs.php83Extensions.pgsql
    pkgs.php83Extensions.pdo_pgsql
    pkgs.php83
  ];
}
