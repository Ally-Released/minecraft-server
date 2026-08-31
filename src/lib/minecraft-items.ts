export interface MinecraftItem {
  id: string;
  name: string;
  count?: number;
  type?: "item" | "block";
  texture?: string;
  enchants?: string[];
  lore?: string[];
}

const CDN_BASE = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.4/assets/minecraft/textures";

export function getItemTextureUrl(item: MinecraftItem): string {
  if (item.id === "shield" || item.texture === "shield") {
    return "/items/shield.svg";
  }
  if (item.id === "netherite_spear" || item.id === "spear" || item.texture === "netherite_spear") {
    return "/items/netherite_spear.svg";
  }
  if (item.id === "crossbow") {
    return `${CDN_BASE}/item/crossbow_standby.png`;
  }
  if (item.id === "mace") {
    return "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures/item/mace.png";
  }
  if (item.id === "wind_burst" || item.id === "wind_charge") {
    return "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures/item/wind_charge.png";
  }
  const filename = item.texture || item.id;
  const folder = item.type === "block" ? "block" : "item";
  return `${CDN_BASE}/${folder}/${filename}.png`;
}

export const SURVIVAL_KIT_ITEMS: Record<string, MinecraftItem[]> = {
  vip: [
    // Row 1
    { id: "diamond_sword", name: "Diamond Sword" },
    { id: "diamond_axe", name: "Diamond Axe" },
    { id: "diamond_pickaxe", name: "Diamond Pickaxe" },
    { id: "oak_log", name: "Oak", count: 64, type: "block" },
    { id: "oak_log", name: "Oak", count: 64, type: "block" },
    { id: "iron_ingot", name: "Iron Ingot", count: 16 },
    { id: "golden_apple", name: "Golden Apple", count: 64 },
    { id: "cooked_beef", name: "Cooked Beef", count: 8 },
    { id: "golden_carrot", name: "Golden Carrot", count: 8 },
    // Row 2
    { id: "emerald", name: "Emerald", count: 4 },
    { id: "diamond", name: "Diamond", count: 32 },
    { id: "coal", name: "Coal", count: 8 },
    { id: "gold_ingot", name: "Gold Ingot", count: 8 },
    { id: "diamond_boots", name: "Diamond Boots" },
    { id: "diamond_chestplate", name: "Diamond Chestplate" },
    { id: "diamond_leggings", name: "Diamond Leggings" },
    { id: "diamond_helmet", name: "Diamond Helmet" },
    { id: "shield", name: "Shield" },
  ],

  elite: [
    // Row 1
    { id: "diamond_sword", name: "Diamond Sword" },
    { id: "diamond_pickaxe", name: "Diamond Pickaxe" },
    { id: "diamond_axe", name: "Diamond Axe" },
    { id: "spear", name: "Spear" },
    { id: "totem_of_undying", name: "Totem of Undying", count: 4 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 9 },
    { id: "gold_ingot", name: "Gold Ingot", count: 16 },
    // Row 2
    { id: "coal", name: "Coal", count: 64 },
    { id: "emerald", name: "Emerald", count: 16 },
    { id: "diamond", name: "Diamond", count: 8 },
    { id: "iron_ingot", name: "Iron Ingot", count: 32 },
    { id: "diamond_boots", name: "Diamond Boots" },
    { id: "diamond_leggings", name: "Diamond Leggings" },
    { id: "diamond_chestplate", name: "Diamond Chestplate" },
    { id: "diamond_helmet", name: "Diamond Helmet" },
    { id: "shield", name: "Shield" },
  ],

  premium: [
    // Row 1
    { id: "netherite_sword", name: "Netherite Sword" },
    { id: "diamond_pickaxe", name: "Diamond Pickaxe" },
    { id: "diamond_axe", name: "Diamond Axe" },
    { id: "trident", name: "Trident" },
    { id: "golden_apple", name: "Golden Apple", count: 36 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "iron_ingot", name: "Iron Ingot", count: 16 },
    { id: "diamond", name: "Diamond", count: 32 },
    { id: "emerald", name: "Emerald", count: 32 },
    // Row 2
    { id: "gold_ingot", name: "Gold Ingot", count: 64 },
    { id: "coal", name: "Coal", count: 92 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 4 },
    { id: "netherite_boots", name: "Netherite Boots" },
    { id: "netherite_leggings", name: "Netherite Leggings" },
    { id: "diamond_chestplate", name: "Diamond Chestplate" },
    { id: "diamond_helmet", name: "Diamond Helmet" },
    { id: "shield", name: "Shield" },
  ],

  titan: [
    // Row 1
    { id: "netherite_sword", name: "Netherite Sword" },
    { id: "netherite_axe", name: "Netherite Axe" },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe" },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe" },
    { id: "netherite_shovel", name: "Netherite Shovel" },
    { id: "spear", name: "Spear" },
    { id: "trident", name: "Trident" },
    { id: "crossbow", name: "Crossbow" },
    { id: "bow", name: "Bow" },
    // Row 2
    { id: "golden_apple", name: "Golden Apple", count: 72 },
    { id: "golden_carrot", name: "Golden Carrot", count: 128 },
    { id: "diamond", name: "Diamond", count: 32 },
    { id: "iron_ingot", name: "Iron Ingot", count: 92 },
    { id: "gold_ingot", name: "Gold Ingot", count: 64 },
    { id: "emerald", name: "Emerald", count: 64 },
    { id: "netherite_ingot", name: "Netherite Ingot", count: 3 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 3 },
    { id: "netherite_boots", name: "Netherite Boots" },
    // Row 3
    { id: "netherite_leggings", name: "Netherite Leggings" },
    { id: "netherite_chestplate", name: "Netherite Chestplate" },
    { id: "netherite_helmet", name: "Netherite Helmet" },
    { id: "shield", name: "Shield" },
  ],

  royal: [
    // Row 1
    { id: "netherite_sword", name: "Netherite Sword" },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe" },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe" },
    { id: "netherite_axe", name: "Netherite Axe" },
    { id: "netherite_hoe", name: "Netherite Hoe" },
    { id: "netherite_shovel", name: "Netherite Shovel" },
    { id: "mace", name: "Mace" },
    { id: "spear", name: "Spear" },
    { id: "bow", name: "Bow" },
    // Row 2
    { id: "totem_of_undying", name: "Totem of Undying", count: 2 },
    { id: "netherite_ingot", name: "Netherite Ingot", count: 8 },
    { id: "diamond", name: "Diamond", count: 64 },
    { id: "crossbow", name: "Crossbow" },
    { id: "trident", name: "Trident" },
    { id: "wind_burst", name: "Wind Burst", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 14 },
    { id: "golden_apple", name: "Golden Apple", count: 110 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    // Row 3
    { id: "netherite_boots", name: "Netherite Boots" },
    { id: "netherite_leggings", name: "Netherite Leggings" },
    { id: "netherite_chestplate", name: "Netherite Chestplate" },
    { id: "netherite_helmet", name: "Netherite Helmet" },
    { id: "shield", name: "Shield" },
  ],
};
