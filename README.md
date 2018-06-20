[Aurelia Skeleton Navigation]:https://github.com/aurelia/skeleton-navigation
[aurelia-cli]: https://github.com/aurelia/cli
[WinJS]: https://github.com/AngelMunoz/WinJS-ES2015-UWP
[AngularJs]: https://github.com/AngelMunoz/Angularjs-ES2015-UWP
[Aurelia]: https://bulma.io
[WinRT API]: https://docs.microsoft.com/en-us/uwp/api/

# Aurelia UWP

Well After some pre ES2015 era ([AngularJs] and [WinJS])
I've put together an aurelia template, sorry guys I didn't base my template after the [Aurelia Skeleton Navigation]
for a simple reason, I just wanted this to work in one way or another, and starting with basic stuf always opens doors.

# Structure
![Structure](https://i.imgur.com/BzN6C1P.png)

The structure is fairly basical, what you will get from the [aurelia-cli] so any aurelia applicable knowledge applies here also
with the additio of the WinRT API bein available, the login and signup views, show an async dialog that is windows native, so anything
you can do with the standard WinRT API in C# is very likely to work here also (using javascript of course)

# An Audio Player
To show you a small sample I added a `.mp3` player you can find relevant code for the WinRT API, can be found [Here](https://github.com/AngelMunoz/AureliaUWP/tree/master/AureliaUWP/src/lib)
and the code for the toolbar is just an [Aurelia] custom component that can be found [here](https://github.com/AngelMunoz/AureliaUWP/tree/master/AureliaUWP/src/resources/uwp-media-toolbar)


1. pick your files
    ![File Picker](https://raw.githubusercontent.com/AngelMunoz/AureliaUWP/master/AureliaUWP/images/media-player3.PNG)
2. Hit play
    ![aurelia uwp](https://raw.githubusercontent.com/AngelMunoz/AureliaUWP/master/AureliaUWP/images/media-player.PNG)
3. Enjoy
    ![File Picker](https://raw.githubusercontent.com/AngelMunoz/AureliaUWP/master/AureliaUWP/images/media-player2.PNG)

I won't be making the next spotify of course, but in the same way you had access to play media (it could have been video too or streaming video/music from a server), you also have access to bluetooth, Wi-Fi, Accelerometer, anything that your devices support and what you can find in the [WinRT API],  but remember that Apps should be offline first, it can be tempting to do full online but desktop development has been mostly for the last decades offline first.

# Caveats
- The anchor tags, if you use a fairly simple  navigation strategy like `<a route-href="route: home">Home</a>`, this will cause the window to reload even if the route is being managed by an aurelia route binding, so to replace that I used a `navigate(route)` method that uses the same aurelia router but programatically instead of declaratively.
- Due to How Visual Studio does it's builds, `its complicated to tell hey! my source code just reloaded, please use this new hash` so it is very likely that you will end up using a single bundle so no code spliting and stuff (sadface)
- To develop the application you should be running the aurelia CLI in the background `au build --watch --env dev` for example and use the *Refresh Windows App* (*Ctrl+Shift+R*) button that is next to your restart application button inside visual studio
- When you reload the app or start it, it takes a while to start. Why? I have no idea.

It is not as weird setup as the WinJS or the AngularJS samples that I've put together but...

![Hey! as long as it works](http://i0.kym-cdn.com/photos/images/original/001/075/794/3e1.png)

