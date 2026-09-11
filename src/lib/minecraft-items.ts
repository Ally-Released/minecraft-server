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
    // Media Diamond Armor
    { id: "diamond_helmet", name: "Media Helmet", enchants: ["Protection III", "Unbreaking II"] },
    { id: "diamond_chestplate", name: "Media Chestplate", enchants: ["Protection III", "Unbreaking II"] },
    { id: "diamond_leggings", name: "Media Leggings", enchants: ["Protection III", "Unbreaking II"] },
    { id: "diamond_boots", name: "Media Boots", enchants: ["Protection III", "Unbreaking II"] },
    // Media Diamond Tools & Weapons
    { id: "diamond_sword", name: "Media Sword", enchants: ["Sharpness III", "Unbreaking II"] },
    { id: "diamond_axe", name: "Media Axe", enchants: ["Efficiency III", "Sharpness III", "Unbreaking II"] },
    { id: "diamond_pickaxe", name: "Media Pickaxe", enchants: ["Efficiency III", "Unbreaking II"] },
    { id: "diamond_shovel", name: "Media Shovel", enchants: ["Efficiency III", "Unbreaking II"] },
    { id: "shield", name: "Media Shield" },
    // Consumables & Food
    { id: "golden_apple", name: "Media Golden Apple", count: 8 },
    { id: "golden_carrot", name: "Media Golden Carrot", count: 32 },
    { id: "cooked_beef", name: "Media Cooked Beef", count: 16 },
    // Valuables & Resources
    { id: "diamond", name: "Media Diamond", count: 8 },
    { id: "iron_ingot", name: "Media Iron Ingot", count: 16 },
  ],

  vip: [
    // VIP Diamond Armor (Custom Enchants)
    { id: "diamond_helmet", name: "VIP Helmet", enchants: ["Elemental Protection II", "Protection IV", "Unbreaking II"] },
    { id: "diamond_chestplate", name: "VIP Chestplate", enchants: ["Elemental Protection II", "Protection IV", "Unbreaking II"] },
    { id: "diamond_leggings", name: "VIP Leggings", enchants: ["Elemental Protection II", "Protection IV", "Unbreaking II"] },
    { id: "diamond_boots", name: "VIP Boots", enchants: ["Elemental Protection II", "Protection IV", "Unbreaking II"] },
    // VIP Diamond Tools & Weapons
    { id: "diamond_sword", name: "VIP Sword", enchants: ["Paralyze I", "Sharpness V", "Unbreaking II"] },
    { id: "diamond_axe", name: "VIP Axe", enchants: ["Glassbreaker I", "Efficiency V", "Silk Touch I", "Unbreaking II"] },
    { id: "diamond_pickaxe", name: "VIP Pickaxe", enchants: ["Lucky Miner I", "Efficiency V", "Fortune II", "Unbreaking II"] },
    { id: "shield", name: "VIP Shield" },
    // Consumables & Food
    { id: "golden_apple", name: "VIP Golden Apple", count: 2 },
    { id: "golden_carrot", name: "VIP Golden Carrot", count: 8 },
    { id: "cooked_beef", name: "VIP Cooked Beef", count: 64 },
    // Valuables & Resources
    { id: "diamond", name: "VIP Diamond", count: 4 },
    { id: "emerald", name: "VIP Emerald", count: 8 },
    { id: "gold_ingot", name: "VIP Gold Ingot", count: 8 },
    { id: "iron_ingot", name: "VIP Iron Ingot", count: 16 },
    { id: "coal", name: "VIP Coal", count: 32 },
    { id: "oak_log", name: "VIP Oak Log", count: 64, type: "block" },
    { id: "oak_log", name: "VIP Oak Log", count: 64, type: "block" },
  ],

  elite: [
    // Elite Netherite Armor
    { id: "netherite_helmet", name: "Elite Helmet", enchants: ["Elemental Protection IV", "Aqua Affinity I", "Mending I", "Protection IV", "Unbreaking III"] },
    { id: "netherite_chestplate", name: "Elite Chestplate", enchants: ["Elemental Protection IV", "Mending I", "Protection IV", "Unbreaking III"] },
    { id: "netherite_leggings", name: "Elite Leggings", enchants: ["Elemental Protection IV", "Mending I", "Protection IV", "Unbreaking III"] },
    { id: "netherite_boots", name: "Elite Boots", enchants: ["Elemental Protection IV", "Feather Falling IV", "Mending I", "Protection IV", "Unbreaking III"] },
    // Elite Netherite Tools, Spear & Weapons
    { id: "netherite_sword", name: "Elite Sword", enchants: ["Ice Aspect II", "Looting III", "Mending I", "Sharpness V", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Elite Pickaxe", enchants: ["Veinminer I", "Efficiency V", "Fortune III", "Mending I", "Unbreaking III"] },
    { id: "netherite_axe", name: "Elite Axe", enchants: ["Telekinesis I", "Efficiency V", "Mending I", "Silk Touch I", "Unbreaking III"] },
    { id: "netherite_spear", name: "Elite Spear" },
    { id: "shield", name: "Elite Shield", enchants: ["Restore I", "Mending I", "Unbreaking III"] },
    // Combat & Consumables
    { id: "totem_of_undying", name: "Elite Totem", count: 4 },
    { id: "enchanted_golden_apple", name: "Elite Enchanted Golden Apple", count: 1 },
    { id: "golden_apple", name: "Elite Golden Apple", count: 8 },
    { id: "golden_carrot", name: "Elite Golden Carrot", count: 64 },
    { id: "cooked_beef", name: "Elite Cooked Beef", count: 64 },
    // Valuables & Resources
    { id: "diamond", name: "Elite Diamond", count: 8 },
    { id: "emerald", name: "Elite Emerald", count: 16 },
    { id: "gold_ingot", name: "Elite Gold Ingot", count: 16 },
    { id: "iron_ingot", name: "Elite Iron Ingot", count: 32 },
    { id: "coal", name: "Elite Coal", count: 64 },
  ],

  premium: [
    // Premium Netherite Armor
    { id: "netherite_helmet", name: "Premium Helmet", enchants: ["Elemental Protection IV", "Night Vision I", "Mending I", "Protection V", "Unbreaking IV"] },
    { id: "netherite_chestplate", name: "Premium Chestplate", enchants: ["Dragon Heart III", "Elemental Protection IV", "Fire Shield III", "Mending I", "Protection V", "Unbreaking IV"] },
    { id: "netherite_leggings", name: "Premium Leggings", enchants: ["Stopping Force III", "Elemental Protection IV", "Mending I", "Protection V", "Unbreaking II"] },
    { id: "netherite_boots", name: "Premium Boots", enchants: ["Elemental Protection IV", "Lightweight I", "Mending I", "Protection V", "Unbreaking II"] },
    // Premium Weapons & Tools
    { id: "netherite_sword", name: "Premium Sword", enchants: ["Bane of Netherspawn V", "Blindness I", "Cure III", "Looting III", "Mending I", "Sharpness III", "Unbreaking IV"] },
    { id: "netherite_pickaxe", name: "Premium Pickaxe", enchants: ["Smelter III", "Veinminer III", "Efficiency VI", "Fortune IV", "Mending I", "Unbreaking IV"] },
    { id: "netherite_axe", name: "Premium Axe", enchants: ["Telekinesis I", "Treefeller I", "Efficiency VI", "Mending I", "Silk Touch I", "Unbreaking IV"] },
    { id: "trident", name: "Premium Trident", enchants: ["Mending I", "Riptide III", "Unbreaking II"] },
    { id: "shield", name: "Premium Shield", enchants: ["Restore II", "Mending I", "Unbreaking III"] },
    // High Tier Consumables
    { id: "totem_of_undying", name: "Premium Totem", count: 4 },
    { id: "enchanted_golden_apple", name: "Premium Enchanted Golden Apple", count: 4 },
    { id: "golden_apple", name: "Premium Golden Apple", count: 32 },
    { id: "golden_carrot", name: "Premium Golden Carrot", count: 64 },
    { id: "cooked_beef", name: "Premium Cooked Beef", count: 64 },
    { id: "cooked_beef", name: "Premium Cooked Beef", count: 64 },
    // Valuables & Resources
    { id: "diamond", name: "Premium Diamond", count: 16 },
    { id: "emerald", name: "Premium Emerald", count: 32 },
    { id: "gold_ingot", name: "Premium Gold Ingot", count: 32 },
    { id: "iron_ingot", name: "Premium Iron Ingot", count: 64 },
    { id: "coal", name: "Premium Coal", count: 64 },
    { id: "coal", name: "Premium Coal", count: 32 },
  ],

  galaxy: [
    // Titan Netherite Armor
    { id: "netherite_helmet", name: "Titan Helmet" },
    { id: "netherite_chestplate", name: "Titan Chestplate" },
    { id: "netherite_leggings", name: "Titan Leggings" },
    { id: "netherite_boots", name: "Titan Boots" },
    // Titan Weapons & Tools
    { id: "netherite_sword", name: "Titan Sword", enchants: ["Bane of Netherspawn VI", "Blindness II", "Confusion II", "Cure III", "Looting III", "Mending I", "Sharpness V", "Sweeping Edge III", "Unbreaking III"] },
    { id: "netherite_axe", name: "Titan Axe" },
    { id: "netherite_pickaxe", name: "Titan Pickaxe" },
    { id: "netherite_spear", name: "Titan Spear" },
    { id: "trident", name: "Titan Trident" },
    { id: "shield", name: "Titan Shield" },
    // Consumables & Food
    { id: "totem_of_undying", name: "Titan Totem", count: 1 },
    { id: "enchanted_golden_apple", name: "Titan Enchanted Golden Apple", count: 1 },
    { id: "golden_apple", name: "Titan Golden Apple", count: 1 },
    { id: "cooked_beef", name: "Titan Cooked Beef", count: 1 },
    { id: "golden_carrot", name: "Titan Golden Carrot", count: 1 },
    // Resources
    { id: "diamond", name: "Titan Diamond", count: 1 },
    { id: "emerald", name: "Titan Emerald", count: 1 },
    { id: "gold_ingot", name: "Titan Gold Ingot", count: 1 },
    { id: "iron_ingot", name: "Titan Iron Ingot", count: 1 },
    { id: "coal", name: "Titan Coal", count: 1 },
  ],

  // Alias titan to galaxy for backward compatibility
  get titan() {
    return this.galaxy;
  },

  royal: [
    // Royal God Netherite Armor
    { id: "netherite_helmet", name: "Royal God Netherite Helmet", enchants: ["Royal God Enchanted", "Protection IV", "Unbreaking III", "Respiration III", "Aqua Affinity", "Thorns III", "Mending"] },
    { id: "netherite_chestplate", name: "Royal God Netherite Chestplate", enchants: ["Royal God Enchanted", "Protection IV", "Unbreaking III", "Thorns III", "Mending"] },
    { id: "netherite_leggings", name: "Royal God Netherite Leggings", enchants: ["Royal God Enchanted", "Protection IV", "Unbreaking III", "Swift Sneak III", "Thorns III", "Mending"] },
    { id: "netherite_boots", name: "Royal God Netherite Boots", enchants: ["Royal God Enchanted", "Protection IV", "Feather Falling IV", "Depth Strider III", "Soul Speed III", "Unbreaking III", "Mending"] },
    // Royal God Netherite Weapons & Tools
    { id: "netherite_sword", name: "Royal God Netherite Sword", enchants: ["Royal God Enchanted", "Sharpness V", "Sweeping Edge III", "Fire Aspect II", "Looting III", "Knockback II", "Unbreaking III", "Mending"] },
    { id: "netherite_pickaxe", name: "Royal God Netherite Pickaxe", enchants: ["Royal God Enchanted", "Efficiency V", "Fortune III", "Unbreaking III", "Mending"] },
    { id: "netherite_axe", name: "Royal God Netherite Axe", enchants: ["Royal God Enchanted", "Efficiency V", "Sharpness V", "Silk Touch", "Unbreaking III", "Mending"] },
    { id: "netherite_shovel", name: "Royal God Netherite Shovel", enchants: ["Royal God Enchanted", "Efficiency V", "Silk Touch", "Unbreaking III", "Mending"] },
    { id: "netherite_hoe", name: "Royal God Netherite Hoe", enchants: ["Royal God Enchanted", "Efficiency V", "Fortune III", "Unbreaking III", "Mending"] },
    // Consumables (96 Golden Apples, 96 Ender Pearls) & Storage (6 Shulker Boxes)
    { id: "golden_apple", name: "Golden Apple", count: 64 },
    { id: "golden_apple", name: "Golden Apple", count: 32 },
    { id: "ender_pearl", name: "Ender Pearl", count: 64 },
    { id: "ender_pearl", name: "Ender Pearl", count: 32 },
    { id: "shulker_box", name: "Royal Shulker Box", count: 6, type: "block" },
  ],
};
