import type { IconType } from "react-icons";
import {
  LuActivity,
  LuAward,
  LuBaby,
  LuBone,
  LuBrain,
  LuBuilding2,
  LuCircleCheck,
  LuClock,
  LuEye,
  LuGlobe,
  LuHeadset,
  LuHeartPulse,
  LuMicroscope,
  LuPackage,
  LuPill,
  LuRefreshCw,
  LuShieldCheck,
  LuStethoscope,
  LuSyringe,
  LuTarget,
  LuTruck,
  LuUsers,
  LuWallet,
  LuZap,
} from "react-icons/lu";
import type { IconName } from "../../utils/interfaces/SiteInterface";

// The website renders these names with lucide-react; react-icons ships the
// same Lucide set, so previews match what visitors see.
const iconMap: Record<IconName, IconType> = {
  Activity: LuActivity,
  Award: LuAward,
  Baby: LuBaby,
  Bone: LuBone,
  Brain: LuBrain,
  Building2: LuBuilding2,
  CheckCircle2: LuCircleCheck,
  Clock: LuClock,
  Eye: LuEye,
  Globe: LuGlobe,
  HeartPulse: LuHeartPulse,
  Headset: LuHeadset,
  Microscope: LuMicroscope,
  Package: LuPackage,
  Pill: LuPill,
  RefreshCw: LuRefreshCw,
  ShieldCheck: LuShieldCheck,
  Stethoscope: LuStethoscope,
  Syringe: LuSyringe,
  Target: LuTarget,
  Truck: LuTruck,
  Users: LuUsers,
  Wallet: LuWallet,
  Zap: LuZap,
};

interface Props {
  name?: string;
  size?: number;
  color?: string;
}

const SiteIcon = ({ name, size = 18, color }: Props) => {
  const Icon = iconMap[name as IconName];
  return Icon ? <Icon size={size} color={color} /> : null;
};

export default SiteIcon;
