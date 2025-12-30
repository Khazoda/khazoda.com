<span class="markdown-header">

[![Explore All Mods Button](https://cdn.modrinth.com/data/cached_images/c6d32f79d6730fcfa7eb1c59b0c71783f3429990.png)](https://khazoda.com)[![Help Translate Button](https://cdn.modrinth.com/data/cached_images/26ca581bda9315561258983f084c33103c7610bf.png)](https://poeditor.com/join/project/0OAhc1DnLs)[![Full Mod Description Button](https://cdn.modrinth.com/data/cached_images/7bdc40049d20ff26aa3f65f03d2e758a352d1bce.png)](https://www.khazoda.com/breakerplacer)

</span>

![Block Breaker & Block Placer Banner](https://cdn.modrinth.com/data/cached_images/d8b8cd1af140afffbb508dce90884c1009b10d83.webp)

<div class="markdown-row">

![Flag US](https://flagsapi.com/US/shiny/32.png)
![Flag China](https://flagsapi.com/CN/shiny/32.png)
![Flag Taiwan](https://flagsapi.com/TW/shiny/32.png)
![Flag Germany](https://flagsapi.com/DE/shiny/32.png)
![Flag Spain](https://flagsapi.com/ES/shiny/32.png)
![Flag Chile](https://flagsapi.com/CL/shiny/32.png)
![Flag Sweden](https://flagsapi.com/SE/shiny/32.png)
![Flag Turkey](https://flagsapi.com/TR/shiny/32.png)
![Flag Ukraine](https://flagsapi.com/UA/shiny/32.png)
![Flag Brazil](https://flagsapi.com/BR/shiny/32.png)
![Flag Russia](https://flagsapi.com/RU/shiny/32.png)

</div>

<!-- Version Badges -->
<div class="markdown-row">

![Static Badge](https://img.shields.io/badge/1.21.11-active_development-seagreen)
![Static Badge](https://img.shields.io/badge/1.21.1-bugfixes-dodgerblue)

</div>


# About

_Block Breaker & Block Placer_ adds two new blocks.  
Similarly to vanilla's Dispenser and Dropper, the Breaker and Placer are activated with a redstone
pulse.

- The Breaker breaks the block in front of it and places it in its inventory.
- The Placer places a random block from its inventory in the spot in front of it.

## Why use this mod?

If you've ever wishes that you could turn items into placed blocks, or vise-versa, this mod is for
you.  
Here are just some of the many applications:

- Automated cobblestone generators
- Secret entrances without using pistons
- New redstone contraptions (redstone torch inside a Placer?)
- Automatic cocoa bean farm

# Recipes

The recipes for both blocks follow similar patterns to the dropper and dispenser:
![Breaker Recipe](https://github.com/Khazoda/block-breaker-placer/raw/Web-Assets/description_common/breaker.png)
![Placer Recipe](https://github.com/Khazoda/block-breaker-placer/raw/Web-Assets/description_common/placer.png)

# Demonstration

<video width="480" height="480" autoplay loop controls>
  <source src="https://github.com/Khazoda/block-breaker-placer/raw/Web-Assets/description_common/demo_video.mp4" type="video/mp4">
</video>

# Balance Considerations

During development it was clear that Breakers would circumvent survival Minecraft's balancing
considerably (e.g. breaking obsidian before the player has a diamond pickaxe).

For this reason, the breaker block respects a block's harvestability settings. This means that the
Breaker will only break the block in front of it if it has the correct tool.

A simple set of examples:

- Breaker has no tool - Can break dirt, logs, fletching table but not stone
- Breaker has wooden pickaxe - Can break stone, coal ore but not iron ore
- Breaker has shears - Can break leaves, tall grass, peonies but not stone

![Divider](https://github.com/Khazoda/block-breaker-placer/blob/Web-Assets/description_common/divider.png?raw=true)

**This mod is part of my _Basic_ series of mods, which try to foster a vanilla-feeling experience
while also giving players new content to enjoy. The 'Basic Storage' mod works especially well with
this mod.**

[View Collection](https://modrinth.com/collection/YqBvBHEr)

# Frequently Asked Questions

**What are the mod's dependencies?**

```
This mod has no extra dependencies
```

**Is there a NeoForge/Fabric/quilt version?**

```
There is currently a Fabric version. NeoForge is not currently planned.
Quilt may work, but is not explicitly supported.
```

**Can you backport the mod to Minecraft 1.X.X?**

```
Unfortunately I don't have the time to backport this mod to earlier versions.
The mod will in some form, support newer major versions of Minecraft.
```

**I found a bug / my game crashed**

```
If you find any problems with this mod, please feel encouraged to create
an issue on the GitHub repository issue tracker.
Bug reports are incredibly helpful, and help make this mod the best it can be.
```
