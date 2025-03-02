<span class="markdown-header">

[![Explore Mods Button Link](https://cdn.modrinth.com/data/cached_images/eb541d0c77a91ed5ef8c1e76cd96e18e0ed55635.png)](https://khazoda.com)
[![Help Translate Button](https://cdn.modrinth.com/data/cached_images/317afd25b5c697dbaf4b749bc12c079147698b23.png)](https://poeditor.com/join/project/0OAhc1DnLs)

</span>

![Block Breaker & Block Placer Banner](https://cdn.modrinth.com/data/cached_images/155d2c95fa3caf55023eeaa6d449ae8b27cf370f_0.webp)

<span class="markdown-row">

![US Flag](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAh1JREFUWEdjZBhgwDjA9jOMOmBwhYBo2lQbpn+MJv8ZGPnxpY3rO3rJSjr/GRleMzIyHBB+dOcazABwCIilTrVi/M84gYGBwZQYk6/u6CNGGT41G///+1su+uz+TUbxlNmKDAy/zzEwMAgQa+qFGB2E0p+/bxCrD6yOnVUDRP3/++8Dg6aaKqNYyrQp1upS2Y/ffGaQFeFlOHbzGYOVuhSYlhXmZXj89jOYjyx/vjkI1c4/f54S5QgWFmlkdczv3k1nFE+ZdsdKXUoZZAEIgBwBswwmhqwJ5CAqRAHYyP8MDHdBDvgPthjqW2Rfw0IB5gCQ5SBwmeU6A4Os9G6ifI1P0ZNnTmAHwIKcWBojCihwCUYIEHIEyK4rJ+eBEi1VANgBsGAPt9JgWHnsBgM6DXMUTPzqkRlfqGI7AwMDPATQUz62tABLA1SPAvRgR7ccXf6S6vejVA8BUgykVjYE2ck4YcPR46RYDlIbLsVBqhac6hmfPX8BLgcGCjC+kVH5NVCWg6PgdWzSiQF1wIBHwVtZtd////9jYdDUOEDXkLh+w+E/A8M/UBq4wsDAoE1XyxGW3WF8uXZD4F9VlYkD4YD/nz6tZHz+/LnC/89f1g6EA6TUVI3BbcLXUorqDIzMXYyMDH50cch/hk3///8tA7cJkS18IaOky8LAaM/IwChMC4f8Z/j/9g/D/4MST+5dhpk/uPoFtPA1ITNHQwAAWLMQ9nMJOhoAAAAASUVORK5CYII=)
![Chinese Flag](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAZxJREFUWEftV7FOwlAUPbdQQSKaaNBFJmWSL3CTn1AHE51w0S/Qn3CSycHB+BHi5hewGSc2isaiEhToM/eRNi005LV5DQx0adN33znnnnvTd0uY8UUz5sdCwPw4YBVLx4YQJwLYB7CWUG/YBLw4RPeF5usDc0gH3os7t0JQdRopFQwIy9Gmi0jUNppv59Qulk4hxN005FTZxPJFHt/VD20CJBDRGbW3d58AVMaRmXTY6I/ifNlrdqLOAmwAq+MCVmrr+Ln6DNjOopYOc+jdfOkqR4cFCJecs0uXTaQrWXkfNPoY1HtwLEe6wevGVspzRkc9AgLMgwyyl/kJ3O61rZXUTxAQwAtsceYo58Ww3f3nX68XzEoWf49dHcmPMP0l4BeuC6LlgDYNWW9XAPdAas9MVgA7IFpDScpi+OJnzd3vOTjhQJi3iX0HwkoQJiCp7EN7QFt3KQIplUARK1bYQsBcOBB6GMUqaPRN8jAKPY6jY8XaUVcaSGJBq2zigYTjVEYyFbwoMd5I5m6a6VAaRbnu2Pn5L9CdmSrewoF/wfKsTZBdqQgAAAAASUVORK5CYII=)

</span>
<span class="markdown-row">

![Static Badge](https://img.shields.io/badge/1.21.1-LTS-blue)

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
