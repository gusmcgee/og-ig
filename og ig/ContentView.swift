//
//  ContentView.swift
//  og ig
//
//  Created by Gus McGee on 7/12/26.
//

import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let wv = WKWebView()
        wv.isInspectable = true
        return wv
    }

    func updateUIView(_ wv: WKWebView, context: Context) {
        wv.load(URLRequest(url: url))
    }
}

struct ContentView: View {
    var body: some View {
        WebView(url: URL(string: "https://www.instagram.com")!)
            .ignoresSafeArea(edges: .bottom)
    }
}
