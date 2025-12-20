import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 p-4 flex justify-center"
    >
      <a
        href="https://www.linkedin.com/in/edafeoghene-egona-7795871a5/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => analytics.linkedInClick()}
        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/70 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          Built by
        </span>
        <span className="text-sm font-semibold text-foreground">Edafeoghene Egona</span>
        <Linkedin className="w-4 h-4 text-[#0A66C2] group-hover:scale-110 transition-transform" />
      </a>
    </motion.footer>
  );
}
