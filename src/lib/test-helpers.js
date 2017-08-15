/* to simulate a server request with async/ await
i.e) to test a loading indicator :

  const serverRequest = async () => {
   this.setState(loading:true)
   await timeout(3000)
   this.setState({loadin:false})
  }

*/

export const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
