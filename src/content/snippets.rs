//! Editable snippets used by the Dioxus site.
use super::Snippet;

pub(super) fn load() -> Vec<Snippet> {
    vec![
        Snippet {
            title: "Swift".into(),
            label: "App.swift".into(),
            language: "swift".into(),
            code: r###"import IrohLib

@main
struct App {
    static func main() async throws {
        // Dial a peer and echo a message over a bidirectional stream.
        let endpoint = try await Endpoint.bind(
            options: EndpointOptions(preset: presetN0())
        )

        let conn = try await endpoint.connect(addr: serverAddr, alpn: ALPN)
        let bi = try await conn.openBi()

        try await bi.send().writeAll(buf: Data("hello iroh".utf8))
        try await bi.send().finish()

        let echoed = try await bi.recv().readToEnd(sizeLimit: 64)
        print(String(decoding: echoed, as: UTF8.self))
    }
}"###
                .into(),
        },
        Snippet {
            title: "Rust".into(),
            label: "main.rs".into(),
            language: "rust".into(),
            code: r###"use anyhow::Result;
use iroh::{Endpoint, endpoint::presets};

#[tokio::main]
async fn main() -> Result<()> {
    // Dial a peer and echo a message over a bidirectional stream.
    let endpoint = Endpoint::bind(presets::N0).await?;

    let conn = endpoint.connect(server_addr, ALPN).await?;
    let (mut send, mut recv) = conn.open_bi().await?;

    send.write_all(b"hello iroh").await?;
    send.finish()?;

    let echoed = recv.read_to_end(64).await?;
    println!("{}", String::from_utf8_lossy(&echoed));
    Ok(())
}"###
                .into(),
        },
        Snippet {
            title: "JavaScript".into(),
            label: "index.js".into(),
            language: "javascript".into(),
            code: r###"const { Endpoint } = require('@number0/iroh')

async function main() {
  // Dial a peer and echo a message over a bidirectional stream.
  const builder = Endpoint.builder()
  builder.applyN0()
  const endpoint = await builder.bind()

  const conn = await endpoint.connect(serverAddr, ALPN)
  const bi = await conn.openBi()

  await bi.send.writeAll(Array.from(Buffer.from('hello iroh')))
  await bi.send.finish()

  const echoed = await bi.recv.readToEnd(64)
  console.log(Buffer.from(echoed).toString())
}

main()"###
                .into(),
        },
        Snippet {
            title: "Kotlin".into(),
            label: "Main.kt".into(),
            language: "kotlin".into(),
            code: r###"import computer.iroh.*
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    // Dial a peer and echo a message over a bidirectional stream.
    val endpoint = Endpoint.bind(EndpointOptions(preset = presetN0()))

    val conn = endpoint.connect(serverAddr, ALPN)
    val bi = conn.openBi()

    bi.send().writeAll("hello iroh".toByteArray())
    bi.send().finish()

    val echoed = bi.recv().readToEnd(64u)
    println(String(echoed))
}"###
                .into(),
        },
        Snippet {
            title: "Python".into(),
            label: "main.py".into(),
            language: "python".into(),
            code: r###"import asyncio
from iroh import Endpoint, EndpointOptions, preset_n0

async def main():
    # Dial a peer and echo a message over a bidirectional stream.
    endpoint = await Endpoint.bind(EndpointOptions(preset=preset_n0()))

    conn = await endpoint.connect(server_addr, ALPN)
    bi = await conn.open_bi()

    await bi.send().write_all(b"hello iroh")
    await bi.send().finish()

    echoed = await bi.recv().read_to_end(64)
    print(echoed.decode())

asyncio.run(main())"###
                .into(),
        },
        Snippet {
            title: "Go".into(),
            label: "main.go".into(),
            language: "go".into(),
            code: r###"package main

import (
	"fmt"

	iroh "git.coopcloud.tech/decentral1se/iroh-go"
)

func main() {
	// Dial a peer and echo a message over a bidirectional stream.
	preset := iroh.PresetN0()
	endpoint, _ := iroh.EndpointBind(iroh.EndpointOptions{Preset: &preset})

	conn, _ := endpoint.Connect(serverAddr, ALPN)
	stream, _ := conn.OpenBi()

	stream.Send().WriteAll([]byte("hello iroh"))
	stream.Send().Finish()

	echoed, _ := stream.Recv().ReadToEnd(64)
	fmt.Println(string(echoed))
}"###
                .into(),
        },
        Snippet {
            title: "C".into(),
            label: "main.c".into(),
            language: "c".into(),
            code: r###"#include <stdio.h>
#include <string.h>
#include "irohnet.h"

int main(void) {
    // Dial a peer and echo a message over a bidirectional stream.
    EndpointConfig_t config = endpoint_config_default();
    endpoint_config_add_alpn(&config, ALPN);

    Endpoint_t *ep = endpoint_default();
    endpoint_bind(&config, NULL, NULL, &ep);

    Connection_t *conn = connection_default();
    endpoint_connect(&ep, ALPN, serverAddr, &conn);

    SendStream_t *send = send_stream_default();
    RecvStream_t *recv = recv_stream_default();
    connection_open_bi(&conn, &send, &recv);

    char *msg = "hello iroh";
    slice_ref_uint8_t data = { .ptr = (uint8_t *)msg, .len = strlen(msg) };
    send_stream_write(&send, data);
    send_stream_finish(send);

    uint8_t buf[64];
    slice_mut_uint8_t out = { .ptr = buf, .len = 64 };
    int n = recv_stream_read(&recv, out);
    printf("%.*s\n", n, buf);
    return 0;
}"###
                .into(),
        },
    ]
}
