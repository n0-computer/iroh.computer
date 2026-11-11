#[cfg(target_arch = "wasm32")]
fn main() {
    dioxus::launch(iroh_computer::App);
}

// The web renderer must run in a browser. Use native `cargo run` as a
// convenience entry point for the Dioxus development server.
#[cfg(not(target_arch = "wasm32"))]
fn main() -> std::process::ExitCode {
    let Some(cli) = dioxus_cli() else {
        eprintln!("Could not find the Dioxus CLI (another program may also be named dx).");
        eprintln!("Install it with: cargo install dioxus-cli --version 0.7.10 --locked");
        eprintln!("Then install the web target: rustup target add wasm32-unknown-unknown");
        return std::process::ExitCode::FAILURE;
    };
    let mut command = std::process::Command::new(cli);
    command
        .current_dir(env!("CARGO_MANIFEST_DIR"))
        .args(["serve", "--platform", "web"])
        .args(std::env::args_os().skip(1));

    // Replace the launcher so Ctrl-C reaches the server directly.
    #[cfg(unix)]
    let error = {
        use std::os::unix::process::CommandExt;
        command.exec()
    };
    #[cfg(not(unix))]
    let error = match command.status() {
        Ok(status) => std::process::exit(status.code().unwrap_or(1)),
        Err(error) => error,
    };

    eprintln!("Could not start the Dioxus web development server: {error}");
    if error.kind() == std::io::ErrorKind::NotFound {
        eprintln!("Install it with: cargo install dioxus-cli --version 0.7.10 --locked");
        eprintln!("Then install the web target: rustup target add wasm32-unknown-unknown");
    }
    std::process::ExitCode::FAILURE
}

/// Deno also installs a `dx` executable. Prefer Cargo's bin directory and
/// verify candidates so PATH ordering cannot launch the wrong development tool.
#[cfg(not(target_arch = "wasm32"))]
fn dioxus_cli() -> Option<std::path::PathBuf> {
    use std::{env, path::PathBuf, process::Command};

    let cargo_home = env::var_os("CARGO_HOME").map(PathBuf::from).or_else(|| {
        env::var_os(if cfg!(windows) { "USERPROFILE" } else { "HOME" })
            .map(|home| PathBuf::from(home).join(".cargo"))
    });
    let path = env::var_os("PATH").unwrap_or_default();
    let executable = if cfg!(windows) { "dx.exe" } else { "dx" };
    cargo_home
        .into_iter()
        .map(|home| home.join("bin"))
        .chain(env::split_paths(&path))
        .map(|directory| directory.join(executable))
        .find(|candidate| {
            candidate.is_file()
                && Command::new(candidate)
                    .arg("--version")
                    .output()
                    .is_ok_and(|output| {
                        output.status.success()
                            && String::from_utf8_lossy(&output.stdout).starts_with("dioxus ")
                    })
        })
}
