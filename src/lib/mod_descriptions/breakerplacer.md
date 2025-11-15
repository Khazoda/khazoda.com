<span class="markdown-header">

[![Explore Mods Button Link](https://cdn.modrinth.com/data/cached_images/bef88760b8669152ada4ead1fc1d84fdb3ad2b0a.png)](https://khazoda.com)[![Help Translate Button](https://cdn.modrinth.com/data/cached_images/f4061e450abcb4cd17694477fc070878dcb8ddd1.png)](https://poeditor.com/join/project/0OAhc1DnLs)

</span>

![Block Breaker & Block Placer Banner](https://cdn.modrinth.com/data/cached_images/155d2c95fa3caf55023eeaa6d449ae8b27cf370f_0.webp)

<span class="markdown-row">

![Flag US](https://flagsapi.com/US/shiny/32.png)
![Flag China](https://flagsapi.com/CN/shiny/32.png)

</span>
<span class="markdown-row">

![Static Badge](https://img.shields.io/badge/1.21.10-LTS-dodgerblue)

</span>

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
