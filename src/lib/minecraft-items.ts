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
  if (item.id.includes("shulker_box") || item.texture?.includes("shulker_box")) {
    return `${CDN_BASE}/block/${item.texture || item.id}.png`;
  }
  if (item.id.includes("log") || item.id.includes("wood")) {
    return `${CDN_BASE}/block/${item.texture || item.id}.png`;
  }
  if (item.id === "enchanted_golden_apple") {
    return `${CDN_BASE}/item/golden_apple.png`;
  }
  const filename = item.texture || item.id;
  const folder = item.type === "block" ? "block" : "item";
  return `${CDN_BASE}/${folder}/${filename}.png`;
}

export const SURVIVAL_KIT_ITEMS: Record<string, MinecraftItem[]> = {
  media: [
    { id: "diamond_sword", name: "Diamond Sword", enchants: ["Sharpness III", "Unbreaking II"] },
    { id: "diamond_axe", name: "Diamond Axe", enchants: ["Efficiency III", "Sharpness III", "Unbreaking II"] },
    { id: "diamond_pickaxe", name: "Diamond Pickaxe", enchants: ["Efficiency III", "Unbreaking II"] },
    { id: "diamond_shovel", name: "Diamond Shovel", enchants: ["Efficiency III", "Unbreaking II"] },
    { id: "golden_apple", name: "Golden Apple", count: 8 },
    { id: "iron_ingot", name: "Iron Ingot", count: 16 },
    { id: "diamond", name: "Diamond", count: 8 },
    { id: "cooked_beef", name: "Cooked Beef", count: 16 },
    { id: "golden_carrot", name: "Golden Carrot", count: 32 },
    { id: "diamond_boots", name: "Diamond Boots", enchants: ["Protection III", "Unbreaking II"] },
    { id: "diamond_leggings", name: "Diamond Leggings", enchants: ["Protection III", "Unbreaking II"] },
    { id: "diamond_chestplate", name: "Diamond Chestplate", enchants: ["Protection III", "Unbreaking II"] },
    { id: "diamond_helmet", name: "Diamond Helmet", enchants: ["Protection III", "Unbreaking II"] },
    { id: "shield", name: "Shield" },
  ],

  vip: [
    { id: "diamond_sword", name: "Diamond Sword", enchants: ["Paralyze I", "Sharpness V", "Unbreaking II"] },
    { id: "diamond_axe", name: "Diamond Axe", enchants: ["Glassbreaker I", "Efficiency V", "Silk Touch I", "Unbreaking II"] },
    { id: "diamond_pickaxe", name: "Diamond Pickaxe", enchants: ["Lucky Miner I", "Efficiency V", "Fortune II", "Unbreaking II"] },
    { id: "oak_log", name: "Oak Log", count: 64, type: "block" },
    { id: "oak_log", name: "Oak Log", count: 64, type: "block" },
    { id: "iron_ingot", name: "Iron Ingot", count: 16 },
    { id: "golden_apple", name: "Golden Apple", count: 2 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 8 },
    { id: "emerald", name: "Emerald", count: 8 },
    { id: "diamond", name: "Diamond", count: 4 },
    { id: "coal", name: "Coal", count: 32 },
    { id: "gold_ingot", name: "Gold Ingot", count: 8 },
    { id: "diamond_boots", name: "Diamond Boots", enchants: ["Elemental Protection II", "Protection IV", "Unbreaking II"] },
    { id: "diamond_leggings", name: "Diamond Leggings", enchants: ["Elemental Protection II", "Protection IV", "Unbreaking II"] },
    { id: "diamond_chestplate", name: "Diamond Chestplate", enchants: ["Elemental Protection II", "Protection IV", "Unbreaking II"] },
    { id: "diamond_helmet", name: "Diamond Helmet", enchants: ["Elemental Protection II", "Protection IV", "Unbreaking II"] },
    { id: "shield", name: "Shield" },
  ],

  elite: [
    { id: "netherite_sword", name: "Netherite Sword", enchants: ["Ice Aspect II", "Looting III", "Mending I", "Sharpness V", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Veinminer I", "Efficiency V", "Fortune III", "Mending I", "Unbreaking III"] },
    { id: "netherite_axe", name: "Netherite Axe", enchants: ["Telekinesis I", "Efficiency V", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "netherite_spear", name: "Netherite Spear" },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 8 },
    { id: "enchanted_golden_apple", name: "Enchanted Golden Apple", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "gold_ingot", name: "Gold Ingot", count: 16 },
    { id: "coal", name: "Coal", count: 64 },
    { id: "emerald", name: "Emerald", count: 16 },
    { id: "diamond", name: "Diamond", count: 8 },
    { id: "iron_ingot", name: "Iron Ingot", count: 32 },
    { id: "netherite_boots", name: "Netherite Boots", enchants: ["Elemental Protection IV", "Feather Falling IV", "Mending I", "Protection IV", "Unbreaking III"] },
    { id: "netherite_leggings", name: "Netherite Leggings", enchants: ["Elemental Protection IV", "Mending I", "Protection IV", "Unbreaking III"] },
    { id: "netherite_chestplate", name: "Netherite Chestplate", enchants: ["Elemental Protection IV", "Mending I", "Protection IV", "Unbreaking III"] },
    { id: "netherite_helmet", name: "Netherite Helmet", enchants: ["Elemental Protection IV", "Aqua Affinity I", "Mending I", "Protection IV", "Unbreaking III"] },
    { id: "shield", name: "Shield", enchants: ["Restore I", "Mending I", "Unbreaking III"] },
  ],

  premium: [
    { id: "netherite_sword", name: "Netherite Sword", enchants: ["Bane of Netherspawn V", "Blindness I", "Cure III", "Looting III", "Mending I", "Sharpness III", "Unbreaking IV"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Smelter III", "Veinminer III", "Efficiency VI", "Fortune IV", "Mending I", "Unbreaking IV"] },
    { id: "netherite_axe", name: "Netherite Axe", enchants: ["Telekinesis I", "Treefeller I", "Efficiency VI", "Mending I", "Silk Touch I", "Unbreaking IV"] },
    { id: "trident", name: "Trident", enchants: ["Mending I", "Riptide III", "Unbreaking II"] },
    { id: "enchanted_golden_apple", name: "Enchanted Golden Apple", count: 4 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 32 },
    { id: "iron_ingot", name: "Iron Ingot", count: 64 },
    { id: "diamond", name: "Diamond", count: 16 },
    { id: "emerald", name: "Emerald", count: 32 },
    { id: "gold_ingot", name: "Gold Ingot", count: 32 },
    { id: "coal", name: "Coal", count: 32 },
    { id: "coal", name: "Coal", count: 64 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "netherite_boots", name: "Netherite Boots", enchants: ["Elemental Protection IV", "Lightweight I", "Mending I", "Protection V", "Unbreaking II"] },
    { id: "netherite_leggings", name: "Netherite Leggings", enchants: ["Elemental Protection IV", "Stopping Force III", "Mending I", "Protection V", "Unbreaking II"] },
    { id: "netherite_chestplate", name: "Netherite Chestplate", enchants: ["Dragon Heart III", "Elemental Protection IV", "Fire Shield III", "Mending I", "Protection V", "Unbreaking IV"] },
    { id: "netherite_helmet", name: "Netherite Helmet", enchants: ["Elemental Protection IV", "Night Vision I", "Mending I", "Protection V", "Unbreaking IV"] },
    { id: "shield", name: "Shield", enchants: ["Restore II", "Mending I", "Unbreaking III"] },
  ],

  titan: [
    { id: "netherite_sword", name: "Netherite Sword", enchants: ["Bane of Netherspawn VI", "Blindness II", "Confusion II", "Cure III", "Looting III", "Mending I", "Sharpness V", "Sweeping Edge III", "Unbreaking III"] },
    { id: "netherite_axe", name: "Netherite Axe", enchants: ["Telekinesis I", "Treefeller I", "Efficiency V", "Mending I", "Smite V", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Telekinesis I", "Efficiency V", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Lucky Miner III", "Smelter IV", "Veinminer IV", "Efficiency V", "Fortune III", "Mending I", "Unbreaking III"] },
    { id: "netherite_shovel", name: "Netherite Shovel", enchants: ["Glassbreaker I", "Efficiency V", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "netherite_spear", name: "Netherite Spear", enchants: ["Lunge III", "Mending I", "Sharpness V", "Unbreaking III"] },
    { id: "trident", name: "Trident", enchants: ["Mending I", "Riptide IV", "Unbreaking III"] },
    { id: "crossbow", name: "Crossbow", enchants: ["Mending I", "Quick Charge III", "Unbreaking III"] },
    { id: "bow", name: "Bow", enchants: ["Mending I", "Power V", "Punch II", "Unbreaking III"] },
    { id: "golden_apple", name: "Golden Apple", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "diamond", name: "Diamond", count: 32 },
    { id: "iron_ingot", name: "Iron Ingot", count: 32 },
    { id: "gold_ingot", name: "Gold Ingot", count: 64 },
    { id: "iron_ingot", name: "Iron Ingot", count: 64 },
    { id: "emerald", name: "Emerald", count: 64 },
    { id: "netherite_ingot", name: "Netherite Ingot", count: 2 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "enchanted_golden_apple", name: "Enchanted Golden Apple", count: 8 },
    { id: "netherite_boots", name: "Netherite Boots", enchants: ["Elemental Protection V", "Restore II", "Speed I", "Depth Strider III", "Feather Falling IV", "Mending I", "Protection VI", "Soul Speed III", "Unbreaking III"] },
    { id: "netherite_leggings", name: "Netherite Leggings", enchants: ["Elemental Protection V", "Restore II", "Stopping Force III", "Mending I", "Protection VI", "Swift Sneak III", "Unbreaking III"] },
    { id: "netherite_chestplate", name: "Netherite Chestplate", enchants: ["Dragon Heart IV", "Elemental Protection V", "Regrowth III", "Restore II", "Mending I", "Protection VI", "Unbreaking III"] },
    { id: "netherite_helmet", name: "Netherite Helmet", enchants: ["Elemental Protection V", "Restore II", "Saturation I", "Water Breathing I", "Aqua Affinity I", "Mending I", "Protection VI", "Respiration III", "Unbreaking III"] },
    { id: "shield", name: "Shield", enchants: ["Restore II", "Mending I", "Unbreaking III"] },
  ],

  royal: [
    { id: "netherite_sword", name: "Netherite Sword", enchants: ["Bane of Netherspawn VI", "Blindness II", "Confusion II", "Cure III", "Looting III", "Mending I", "Sharpness VII", "Sweeping Edge III", "Unbreaking III"] },
    { id: "netherite_axe", name: "Netherite Axe", enchants: ["Telekinesis I", "Treefeller I", "Efficiency VI", "Mending I", "Smite V", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Telekinesis I", "Efficiency VI", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Lucky Miner III", "Smelter IV", "Veinminer IV", "Efficiency VI", "Fortune IV", "Mending I", "Unbreaking III"] },
    { id: "netherite_hoe", name: "Netherite Hoe", enchants: ["Efficiency VI", "Fortune IV", "Mending I", "Unbreaking IV"] },
    { id: "netherite_shovel", name: "Netherite Shovel", enchants: ["Glassbreaker I", "Efficiency V", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "mace", name: "Mace", enchants: ["Density V", "Mending I", "Unbreaking III", "Wind Burst II"] },
    { id: "netherite_spear", name: "Netherite Spear", enchants: ["Lunge IV", "Mending I", "Sharpness V", "Unbreaking IV"] },
    { id: "bow", name: "Bow", enchants: ["Mending I", "Power VI", "Punch III", "Unbreaking IV"] },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "netherite_ingot", name: "Netherite Ingot", count: 8 },
    { id: "diamond", name: "Diamond", count: 64 },
    { id: "crossbow", name: "Crossbow", enchants: ["Mending I", "Multishot II", "Quick Charge V", "Unbreaking IV"] },
    { id: "trident", name: "Trident", enchants: ["Mending I", "Riptide IV", "Unbreaking IV"] },
    { id: "wind_charge", name: "Wind Charge", count: 64 },
    { id: "wind_charge", name: "Wind Charge", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "enchanted_golden_apple", name: "Enchanted Golden Apple", count: 14 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 32 },
    { id: "netherite_boots", name: "Netherite Boots", enchants: ["Elemental Protection VII", "Flame Walker II", "Jumping II", "Lightweight I", "Restore III", "Speed II", "Depth Strider III", "Feather Falling IV", "Mending I", "Protection VII", "Soul Speed III", "Unbreaking III"] },
    { id: "netherite_leggings", name: "Netherite Leggings", enchants: ["Elemental Protection VII", "Restore III", "Stopping Force III", "Mending I", "Protection VII", "Swift Sneak III", "Unbreaking III"] },
    { id: "netherite_chestplate", name: "Netherite Chestplate", enchants: ["Cold Steel III", "Darkness Cloak III", "Dragon Heart VI", "Elemental Protection VII", "Fire Shield IV", "Hardened II", "Restore III", "Mending I", "Protection VII", "Unbreaking IV"] },
    { id: "netherite_helmet", name: "Netherite Helmet", enchants: ["Elemental Protection VII", "Night Vision I", "Restore III", "Saturation I", "Water Breathing I", "Aqua Affinity I", "Mending I", "Protection VII", "Respiration III", "Unbreaking III"] },
    { id: "shield", name: "Shield", enchants: ["Mending I", "Unbreaking IV"] },
  ],
};

export const VANILLA_KIT_ITEMS: Record<string, MinecraftItem[]> = {
  media: [
    { id: "diamond_sword", name: "Diamond Sword", enchants: ["Sharpness III", "Unbreaking II"] },
    { id: "diamond_axe", name: "Diamond Axe", enchants: ["Efficiency III", "Sharpness III", "Unbreaking II"] },
    { id: "diamond_pickaxe", name: "Diamond Pickaxe", enchants: ["Efficiency III", "Unbreaking II"] },
    { id: "diamond_shovel", name: "Diamond Shovel", enchants: ["Efficiency III", "Unbreaking II"] },
    { id: "golden_apple", name: "Golden Apple", count: 8 },
    { id: "iron_ingot", name: "Iron Ingot", count: 16 },
    { id: "diamond", name: "Diamond", count: 8 },
    { id: "cooked_beef", name: "Cooked Beef", count: 16 },
    { id: "golden_carrot", name: "Golden Carrot", count: 32 },
    { id: "diamond_boots", name: "Diamond Boots", enchants: ["Protection III", "Unbreaking II"] },
    { id: "diamond_leggings", name: "Diamond Leggings", enchants: ["Protection III", "Unbreaking II"] },
    { id: "diamond_chestplate", name: "Diamond Chestplate", enchants: ["Protection III", "Unbreaking II"] },
    { id: "diamond_helmet", name: "Diamond Helmet", enchants: ["Protection III", "Unbreaking II"] },
    { id: "shield", name: "Shield" },
  ],

  vip: [
    { id: "diamond_sword", name: "Diamond Sword", enchants: ["Sharpness V", "Unbreaking II"] },
    { id: "diamond_axe", name: "Diamond Axe", enchants: ["Efficiency V", "Silk Touch I", "Unbreaking II"] },
    { id: "diamond_pickaxe", name: "Diamond Pickaxe", enchants: ["Efficiency V", "Fortune II", "Unbreaking II"] },
    { id: "oak_log", name: "Oak Log", count: 64, type: "block" },
    { id: "oak_log", name: "Oak Log", count: 64, type: "block" },
    { id: "iron_ingot", name: "Iron Ingot", count: 16 },
    { id: "golden_apple", name: "Golden Apple", count: 2 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 8 },
    { id: "emerald", name: "Emerald", count: 8 },
    { id: "diamond", name: "Diamond", count: 4 },
    { id: "coal", name: "Coal", count: 32 },
    { id: "gold_ingot", name: "Gold Ingot", count: 8 },
    { id: "diamond_boots", name: "Diamond Boots", enchants: ["Protection IV", "Unbreaking II"] },
    { id: "diamond_leggings", name: "Diamond Leggings", enchants: ["Protection IV", "Unbreaking II"] },
    { id: "diamond_chestplate", name: "Diamond Chestplate", enchants: ["Protection IV", "Unbreaking II"] },
    { id: "diamond_helmet", name: "Diamond Helmet", enchants: ["Protection IV", "Unbreaking II"] },
    { id: "shield", name: "Shield" },
  ],

  elite: [
    { id: "netherite_sword", name: "Netherite Sword", enchants: ["Looting III", "Mending I", "Sharpness V", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Efficiency V", "Fortune III", "Mending I", "Unbreaking III"] },
    { id: "netherite_axe", name: "Netherite Axe", enchants: ["Efficiency V", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "netherite_spear", name: "Netherite Spear" },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 8 },
    { id: "enchanted_golden_apple", name: "Enchanted Golden Apple", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "gold_ingot", name: "Gold Ingot", count: 16 },
    { id: "coal", name: "Coal", count: 64 },
    { id: "emerald", name: "Emerald", count: 16 },
    { id: "diamond", name: "Diamond", count: 8 },
    { id: "iron_ingot", name: "Iron Ingot", count: 32 },
    { id: "netherite_boots", name: "Netherite Boots", enchants: ["Feather Falling IV", "Mending I", "Protection IV", "Unbreaking III"] },
    { id: "netherite_leggings", name: "Netherite Leggings", enchants: ["Mending I", "Protection IV", "Unbreaking III"] },
    { id: "netherite_chestplate", name: "Netherite Chestplate", enchants: ["Mending I", "Protection IV", "Unbreaking III"] },
    { id: "netherite_helmet", name: "Netherite Helmet", enchants: ["Aqua Affinity I", "Mending I", "Protection IV", "Unbreaking III"] },
    { id: "shield", name: "Shield", enchants: ["Mending I", "Unbreaking III"] },
  ],

  premium: [
    { id: "netherite_sword", name: "Netherite Sword", enchants: ["Looting III", "Mending I", "Sharpness III", "Unbreaking IV"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Efficiency VI", "Fortune IV", "Mending I", "Unbreaking IV"] },
    { id: "netherite_axe", name: "Netherite Axe", enchants: ["Efficiency VI", "Mending I", "Silk Touch I", "Unbreaking IV"] },
    { id: "trident", name: "Trident", enchants: ["Mending I", "Riptide III", "Unbreaking II"] },
    { id: "enchanted_golden_apple", name: "Enchanted Golden Apple", count: 4 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "cooked_beef", name: "Cooked Beef", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 32 },
    { id: "iron_ingot", name: "Iron Ingot", count: 64 },
    { id: "diamond", name: "Diamond", count: 16 },
    { id: "emerald", name: "Emerald", count: 32 },
    { id: "gold_ingot", name: "Gold Ingot", count: 32 },
    { id: "coal", name: "Coal", count: 32 },
    { id: "coal", name: "Coal", count: 64 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "netherite_boots", name: "Netherite Boots", enchants: ["Mending I", "Protection V", "Unbreaking II"] },
    { id: "netherite_leggings", name: "Netherite Leggings", enchants: ["Mending I", "Protection V", "Unbreaking II"] },
    { id: "netherite_chestplate", name: "Netherite Chestplate", enchants: ["Mending I", "Protection V", "Unbreaking IV"] },
    { id: "netherite_helmet", name: "Netherite Helmet", enchants: ["Mending I", "Protection V", "Unbreaking IV"] },
    { id: "shield", name: "Shield", enchants: ["Mending I", "Unbreaking III"] },
  ],

  titan: [
    { id: "netherite_sword", name: "Netherite Sword", enchants: ["Looting III", "Mending I", "Sharpness V", "Sweeping Edge III", "Unbreaking III"] },
    { id: "netherite_axe", name: "Netherite Axe", enchants: ["Efficiency V", "Mending I", "Smite V", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Efficiency V", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Efficiency V", "Fortune III", "Mending I", "Unbreaking III"] },
    { id: "netherite_shovel", name: "Netherite Shovel", enchants: ["Efficiency V", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "netherite_spear", name: "Netherite Spear", enchants: ["Mending I", "Sharpness V", "Unbreaking III"] },
    { id: "trident", name: "Trident", enchants: ["Mending I", "Riptide IV", "Unbreaking III"] },
    { id: "crossbow", name: "Crossbow", enchants: ["Mending I", "Quick Charge III", "Unbreaking III"] },
    { id: "bow", name: "Bow", enchants: ["Mending I", "Power V", "Punch II", "Unbreaking III"] },
    { id: "golden_apple", name: "Golden Apple", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "diamond", name: "Diamond", count: 32 },
    { id: "iron_ingot", name: "Iron Ingot", count: 32 },
    { id: "gold_ingot", name: "Gold Ingot", count: 64 },
    { id: "iron_ingot", name: "Iron Ingot", count: 64 },
    { id: "emerald", name: "Emerald", count: 64 },
    { id: "netherite_ingot", name: "Netherite Ingot", count: 2 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "enchanted_golden_apple", name: "Enchanted Golden Apple", count: 8 },
    { id: "netherite_boots", name: "Netherite Boots", enchants: ["Depth Strider III", "Feather Falling IV", "Mending I", "Protection VI", "Soul Speed III", "Unbreaking III"] },
    { id: "netherite_leggings", name: "Netherite Leggings", enchants: ["Mending I", "Protection VI", "Swift Sneak III", "Unbreaking III"] },
    { id: "netherite_chestplate", name: "Netherite Chestplate", enchants: ["Mending I", "Protection VI", "Unbreaking III"] },
    { id: "netherite_helmet", name: "Netherite Helmet", enchants: ["Aqua Affinity I", "Mending I", "Protection VI", "Respiration III", "Unbreaking III"] },
    { id: "shield", name: "Shield", enchants: ["Mending I", "Unbreaking III"] },
  ],

  royal: [
    { id: "netherite_sword", name: "Netherite Sword", enchants: ["Looting III", "Mending I", "Sharpness VII", "Sweeping Edge III", "Unbreaking III"] },
    { id: "netherite_axe", name: "Netherite Axe", enchants: ["Efficiency VI", "Mending I", "Smite V", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Efficiency VI", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Efficiency VI", "Fortune IV", "Mending I", "Unbreaking III"] },
    { id: "netherite_hoe", name: "Netherite Hoe", enchants: ["Efficiency VI", "Fortune IV", "Mending I", "Unbreaking IV"] },
    { id: "netherite_shovel", name: "Netherite Shovel", enchants: ["Efficiency V", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "mace", name: "Mace", enchants: ["Density V", "Mending I", "Unbreaking III", "Wind Burst II"] },
    { id: "netherite_spear", name: "Netherite Spear", enchants: ["Mending I", "Sharpness V", "Unbreaking IV"] },
    { id: "bow", name: "Bow", enchants: ["Mending I", "Power VI", "Punch III", "Unbreaking IV"] },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "totem_of_undying", name: "Totem of Undying", count: 1 },
    { id: "netherite_ingot", name: "Netherite Ingot", count: 8 },
    { id: "diamond", name: "Diamond", count: 64 },
    { id: "crossbow", name: "Crossbow", enchants: ["Mending I", "Multishot II", "Quick Charge V", "Unbreaking IV"] },
    { id: "trident", name: "Trident", enchants: ["Mending I", "Riptide IV", "Unbreaking IV"] },
    { id: "wind_charge", name: "Wind Charge", count: 64 },
    { id: "wind_charge", name: "Wind Charge", count: 64 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "enchanted_golden_apple", name: "Enchanted Golden Apple", count: 14 },
    { id: "golden_carrot", name: "Golden Carrot", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 32 },
    { id: "netherite_boots", name: "Netherite Boots", enchants: ["Depth Strider III", "Feather Falling IV", "Mending I", "Protection VII", "Soul Speed III", "Unbreaking III"] },
    { id: "netherite_leggings", name: "Netherite Leggings", enchants: ["Mending I", "Protection VII", "Swift Sneak III", "Unbreaking III"] },
    { id: "netherite_chestplate", name: "Netherite Chestplate", enchants: ["Mending I", "Protection VII", "Unbreaking IV"] },
    { id: "netherite_helmet", name: "Netherite Helmet", enchants: ["Aqua Affinity I", "Mending I", "Protection VII", "Respiration III", "Unbreaking III"] },
    { id: "shield", name: "Shield", enchants: ["Mending I", "Unbreaking IV"] },
  ],
};

export function getKitItems(rankId: string, catalogueId: string = "survival"): MinecraftItem[] {
  if (catalogueId === "vanilla") {
    return VANILLA_KIT_ITEMS[rankId] || [];
  }
  return SURVIVAL_KIT_ITEMS[rankId] || [];
}
