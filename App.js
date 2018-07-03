import React from 'react';
import { StyleSheet, View, Text, WebView } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: 'https://en.wikipedia.org/wiki/Albert_Einstein',
      path: [],
      steps: 0,
    }
  }

  _onNavigationStateChange(webViewState){
    const currLoc = webViewState.url.split('/')[4]
    const pastLoc = this.state.path[this.state.path.length-1]
    console.log(webViewState)
    if (pastLoc !== currLoc && webViewState.loading == false) {
      // console.log('hit this')
      const newArray = this.state.path.concat(currLoc)
      this.setState(() => {
        return { path: newArray };
      });
    }
  }

  render() {
    return (
    <View style={styles.container}>
      <WebView
        ref="webview"
        source={{uri:this.state.url}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled = {true}
        style={styles.webView}
      />
      <Text>{this.state.path.join(", ")}</Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  webView: {
    marginTop: 20, 
    flex: 1
  },
  container: {
    flex: 1,
  },
});
