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
  const filename = item.texture || item.id;
  const folder = item.type === "block" ? "block" : "item";
  return `${CDN_BASE}/${folder}/${filename}.png`;
}

export const SURVIVAL_KIT_ITEMS: Record<string, MinecraftItem[]> = {
  vip: [
    // Enchanted Diamond Armor
    { id: "diamond_helmet", name: "Enchanted Diamond Helmet", enchants: ["Protection IV", "Unbreaking III"] },
    { id: "diamond_chestplate", name: "Enchanted Diamond Chestplate", enchants: ["Protection IV", "Unbreaking III"] },
    { id: "diamond_leggings", name: "Enchanted Diamond Leggings", enchants: ["Protection IV", "Unbreaking III"] },
    { id: "diamond_boots", name: "Enchanted Diamond Boots", enchants: ["Protection IV", "Feather Falling IV", "Unbreaking III"] },
    // Enchanted Diamond Tools
    { id: "diamond_sword", name: "Enchanted Diamond Sword", enchants: ["Sharpness V", "Unbreaking III", "Looting III"] },
    { id: "diamond_pickaxe", name: "Enchanted Diamond Pickaxe", enchants: ["Efficiency V", "Unbreaking III", "Fortune III"] },
    { id: "diamond_axe", name: "Enchanted Diamond Axe", enchants: ["Efficiency V", "Sharpness V", "Unbreaking III"] },
    { id: "diamond_shovel", name: "Enchanted Diamond Shovel", enchants: ["Efficiency V", "Unbreaking III"] },
    // Consumables & Storage
    { id: "golden_apple", name: "Golden Apple", count: 16 },
    { id: "ender_pearl", name: "Ender Pearl", count: 16 },
    { id: "shulker_box", name: "Shulker Box", count: 1, type: "block" },
  ],

  elite: [
    // Full Enchanted Netherite Armor
    { id: "netherite_helmet", name: "Enchanted Netherite Helmet", enchants: ["Protection IV", "Unbreaking III"] },
    { id: "netherite_chestplate", name: "Enchanted Netherite Chestplate", enchants: ["Protection IV", "Unbreaking III"] },
    { id: "netherite_leggings", name: "Enchanted Netherite Leggings", enchants: ["Protection IV", "Unbreaking III"] },
    { id: "netherite_boots", name: "Enchanted Netherite Boots", enchants: ["Protection IV", "Feather Falling IV", "Unbreaking III"] },
    // Netherite Tools
    { id: "netherite_sword", name: "Netherite Sword", enchants: ["Sharpness V", "Unbreaking III"] },
    { id: "netherite_pickaxe", name: "Netherite Pickaxe", enchants: ["Efficiency V", "Unbreaking III"] },
    { id: "netherite_axe", name: "Netherite Axe", enchants: ["Efficiency V", "Unbreaking III"] },
    { id: "netherite_shovel", name: "Netherite Shovel", enchants: ["Efficiency V", "Unbreaking III"] },
    // Consumables & Storage
    { id: "golden_apple", name: "Golden Apple", count: 32 },
    { id: "ender_pearl", name: "Ender Pearl", count: 32 },
    { id: "shulker_box", name: "Shulker Box", count: 2, type: "block" },
  ],

  premium: [
    // Improved Enchanted Netherite Armor
    { id: "netherite_helmet", name: "Improved Enchanted Netherite Helmet", enchants: ["Protection IV", "Unbreaking III", "Respiration III", "Mending"] },
    { id: "netherite_chestplate", name: "Improved Enchanted Netherite Chestplate", enchants: ["Protection IV", "Unbreaking III", "Mending"] },
    { id: "netherite_leggings", name: "Improved Enchanted Netherite Leggings", enchants: ["Protection IV", "Unbreaking III", "Mending"] },
    { id: "netherite_boots", name: "Improved Enchanted Netherite Boots", enchants: ["Protection IV", "Feather Falling IV", "Depth Strider III", "Unbreaking III", "Mending"] },
    // Enchanted Netherite Sword & Tools
    { id: "netherite_sword", name: "Enchanted Netherite Sword", enchants: ["Sharpness V", "Fire Aspect II", "Looting III", "Unbreaking III", "Mending"] },
    { id: "netherite_pickaxe", name: "Enchanted Netherite Pickaxe", enchants: ["Efficiency V", "Fortune III", "Unbreaking III", "Mending"] },
    { id: "netherite_axe", name: "Enchanted Netherite Axe", enchants: ["Efficiency V", "Sharpness V", "Unbreaking III", "Mending"] },
    { id: "netherite_shovel", name: "Enchanted Netherite Shovel", enchants: ["Efficiency V", "Unbreaking III", "Mending"] },
    { id: "netherite_hoe", name: "Enchanted Netherite Hoe", enchants: ["Efficiency V", "Unbreaking III", "Mending"] },
    // Consumables & Storage
    { id: "golden_apple", name: "Golden Apple", count: 48 },
    { id: "ender_pearl", name: "Ender Pearl", count: 48 },
    { id: "shulker_box", name: "Shulker Box", count: 3, type: "block" },
  ],

  galaxy: [
    // God Enchanted Netherite Armor
    { id: "netherite_helmet", name: "God Enchanted Netherite Helmet", enchants: ["Protection IV", "Unbreaking III", "Respiration III", "Aqua Affinity", "Thorns III", "Mending"] },
    { id: "netherite_chestplate", name: "God Enchanted Netherite Chestplate", enchants: ["Protection IV", "Unbreaking III", "Thorns III", "Mending"] },
    { id: "netherite_leggings", name: "God Enchanted Netherite Leggings", enchants: ["Protection IV", "Unbreaking III", "Swift Sneak III", "Thorns III", "Mending"] },
    { id: "netherite_boots", name: "God Enchanted Netherite Boots", enchants: ["Protection IV", "Feather Falling IV", "Depth Strider III", "Soul Speed III", "Unbreaking III", "Mending"] },
    // God Enchanted Netherite Sword & Tools
    { id: "netherite_sword", name: "God Enchanted Netherite Sword", enchants: ["Sharpness V", "Sweeping Edge III", "Fire Aspect II", "Looting III", "Knockback II", "Unbreaking III", "Mending"] },
    { id: "netherite_pickaxe", name: "God Enchanted Netherite Pickaxe", enchants: ["Efficiency V", "Fortune III", "Unbreaking III", "Mending"] },
    { id: "netherite_axe", name: "God Enchanted Netherite Axe", enchants: ["Efficiency V", "Sharpness V", "Silk Touch", "Unbreaking III", "Mending"] },
    { id: "netherite_shovel", name: "God Enchanted Netherite Shovel", enchants: ["Efficiency V", "Silk Touch", "Unbreaking III", "Mending"] },
    { id: "netherite_hoe", name: "God Enchanted Netherite Hoe", enchants: ["Efficiency V", "Fortune III", "Unbreaking III", "Mending"] },
    // Consumables & Storage
    { id: "golden_apple", name: "Golden Apple", count: 64 },
    { id: "ender_pearl", name: "Ender Pearl", count: 64 },
    { id: "shulker_box", name: "Shulker Box", count: 4, type: "block" },
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
