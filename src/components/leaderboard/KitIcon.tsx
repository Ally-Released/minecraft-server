import {
  Axe,
  BedDouble,
  BowArrow,
  BrickWall,
  CircleDot,
  Clock,
  Crosshair,
  DoorOpen,
  Droplets,
  Flame,
  FlaskConical,
  Gem,
  Hammer,
  Hand,
  HeartPulse,
  Shield,
  Snowflake,
  Sparkles,
  Swords,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  overall: Trophy,
  hours: Clock,
  nethpot: FlaskConical,
  ironpot: FlaskConical,
  diamondpot: Droplets,
  classic: Swords,
  boxing: Hand,
  sumo: CircleDot,
  fighter: Swords,
  axeandshield: Axe,
  beast: Axe,
  tank: Shield,
  speedtank: Shield,
  optank: Shield,
  cpvpffa: Gem,
  totembreaker: Sparkles,
  smpkit: BrickWall,
  diasmp: BrickWall,
  bowpvp: BowArrow,
  spearelytra: Target,
  macepvp: Hammer,
  macerocket: Hammer,
  spearmace: Hammer,
  spearhorse: Target,
  bedwars: BedDouble,
  thebridge: BrickWall,
  spleef: Snowflake,
  mlgrush: Target,
  manhunt: Crosshair,
  fireball: Flame,
  lifesteal: HeartPulse,
  cartpvp: CircleDot,
  doorpvp: DoorOpen,
  builduhc: HeartPulse,
};

export function KitIcon({
  id,
  size = 22,
  className = "",
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[id] ?? Trophy;
  return <Icon aria-hidden className={`shrink-0 ${className}`} size={size} strokeWidth={2.1} />;
}
