#[cfg(target_arch = "wasm32")]
fn main() {
    dioxus::launch(iroh_computer::App);
}

// The web renderer must run in a browser. Use native `cargo run` as a
// convenience entry point for the Dioxus development server.
#[cfg(not(target_arch = "wasm32"))]
fn main() -> std::process::ExitCode {
    let mut command = std::process::Command::new("dx");
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
