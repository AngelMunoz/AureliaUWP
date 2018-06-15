[Aurelia Skeleton Navigation]:https://github.com/aurelia/skeleton-navigation
[aurelia-cli]: https://github.com/aurelia/cli
# Aurelia UWP

Well After some pre ES2015 era ([AngularJs](https://github.com/AngelMunoz/Angularjs-ES2015-UWP) and [WinJS](https://github.com/AngelMunoz/WinJS-ES2015-UWP))
I've put together an aurelia template, sorry guys I didn't base my template after the [Aurelia Skeleton Navigation]
for a simple reason, I just wanted this to work in one way or another, and starting with basic stuf always opens doors.

# Structure
![Structure](https://i.imgur.com/BzN6C1P.png)

The structure is fairly basical, what you will get from the [aurelia-cli] so any aurelia applicable knowledge applies here also
with the additio of the WinRT API bein available, the login and signup views, show an async dialog that is windows native, so anything
you can do with the standard WinRT API in C# is very likely to work here also (using javascript of course)

# Caveats
- The anchor tags, if you use a fairly simple  navigation strategy like `<a route-href="route: home">Home</a>`, this will cause the window to reload even if the route is being managed by an aurelia route binding, so to replace that I used a `navigate(route)` method that uses the same aurelia router but programatically instead of declaratively.
- Due to How Visual Studio does it's builds, `its complicated to tell hey! my source code just reloaded, please use this new hash` so it is very likely that you will end up using a single bundle so no code spliting and stuff (sadface)
- To develop the application you should be running the aurelia CLI in the background `au bluild --watch --env dev` for example and use the *Refresh Windows App* (*Ctrl+Shift+R*) button that is next to your restart application button inside visual studio
- When you reload the app or start it, it takes a while to start. Why? I have no idea.

It is not as weird setup as the WinJS or the AngularJS samples that I've put together but...

![Hey! as long as it works](http://i0.kym-cdn.com/photos/images/original/001/075/794/3e1.png)

