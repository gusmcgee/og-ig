//
//  ContentView.swift
//  og ig
//
//  Created by Gus McGee on 7/12/26.
//

import SwiftUI
import WebKit

struct AppView: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let scriptURL = Bundle.main.url(forResource: "script", withExtension: "js")!
        
        let jsStr = try! String(contentsOf: scriptURL, encoding: .utf8)
        
        let script = WKUserScript(
            source: jsStr,
            injectionTime: .atDocumentStart,
            forMainFrameOnly: false
        )
        
        let config = WKWebViewConfiguration()

        config.userContentController.addUserScript(script)
        
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.suppressesIncrementalRendering = true

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.load(URLRequest(url: url))
        webView.isInspectable = true
        
        webView.scrollView.bounces = true
        webView.scrollView.showsVerticalScrollIndicator = false
        webView.allowsBackForwardNavigationGestures = true
        webView.allowsLinkPreview = false
        
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}
}

struct StatsView: View {
    var body: some View {
        Color.red
    }
}

struct ContentView: View {
    private let url = URL(string: "https://www.instagram.com")!

    var body: some View {
        AppView(url: url)
            .safeAreaInset(edge: .bottom) {
                StatsView()
                    .frame(height: 8)
            }
    }
}


// compare playback to native ig webiste in safari/google app
// audio keep playback after closing
