---
layout: post
title: "Assembly binding redirect not working"
date: 2013-12-16
tags: CSharp AssemblyBinding
is:
    commentsEnabled: true
---

# {{ page.title }}

Some times we have new version of library, but some of the old libraries require old versions. In this case assembly binding redirect is best approach. But sometimes binding redirect is not working and wrong version of assembly was loaded and type was not resolved. When we are expecting that type will be loaded from new version of assembly ```Version=x.x.x.x```, but exception has occurred:
```
"Could not load type 'Type.Name' from assembly 'Assembly.Name, Version=c.c.c.c, Culture=neutral, PublicKeyToken=publickeytoken'"
```
Several hints are exist to resolve this issue. I'll describe some of them.

<!-- more -->

### First hint is configuration file for binding redirect:

``` xml
<?xml version="1.0" encoding="utf-8"?>
<!-- xmlns is not set -->
<configuration>
  <runtime>
    <!-- xmlns is set -->
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <dependentAssembly>
        <assemblyIdentity name="Assembly.Name" publicKeyToken="publickeytoken" culture="neutral" />
        <bindingRedirect oldVersion="a.a.a.a-b.b.b.b" newVersion="x.x.x.x" />
      </dependentAssembly>
      <!-- other staff  -->
    </assemblyBinding>
  </runtime>
  <!-- other staff -->
</configuration>
```

### Second hint is folders where assembly will be searched:

* DEVPATH if it is enabled in machine.config or in your app\web config

```
C:\Windows\Microsoft.NET\Framework\v2.0.50727\CONFIG\machine.config
C:\Windows\Microsoft.NET\Framework64\v2.0.50727\CONFIG\machine.config
C:\Windows\Microsoft.NET\Framework\v4.0.30319\Config\machine.config
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\machine.config
```
``` xml
<configuration> 
    <runtime> 
        <developmentMode developerInstallation="true"/>
    </runtime> 
</configuration>
```
``` bat
rem To check what is current DEVPATH you need run simple command in console
echo %DEVPATH%
```
* GAC
* Different folders (probing folder)

``` xml
<configuration>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <probing privatePath="modulesbin" />
    </assemblyBinding>
  </runtime>
</configuration>
```
* Folder where executing assembly is located

### Third hint is assembly binding log viewer **fuslogvw.exe**:

1. **Navigate to:** Start => All Programs => Microsoft Visual Studio _(This is different for diferent versions of VS)_ => Visual Studio Tools
2. **Right-click on:** Visual Studio Command Prompt _(This is different for diferent versions of VS)_
3. **Click:** Run as administrator
4. In console window run:

``` bat
fuslogvw
```

P.S. If you know another useful hints fill free to post in comments.
