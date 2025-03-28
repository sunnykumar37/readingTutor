import {
  Github,
  Mail,
  Twitter,
  Loader2,
  type LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  mail: Mail,
  twitter: Twitter,
  gitHub: Github,
  spinner: Loader2,
} as const 