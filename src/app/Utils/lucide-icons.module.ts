import { NgModule } from '@angular/core';
import {
  TextAlignJustify,
  ArrowRight,
  Ellipsis,
  EllipsisVertical,
  Loader,
  LogIn,
  LucideAngularModule,
  Moon,
  Search,
  SquarePen,
  Sun,
  UserRound,
  KeyRound,
  CircleAlert,
  EyeClosed,
  Eye,
  ArrowUp,
  ChevronLeft,
} from 'lucide-angular';

@NgModule({
  declarations: [],
  imports: [
    LucideAngularModule.pick({
      Search,
      SquarePen,
      TextAlignJustify,
      EllipsisVertical,
      Sun,
      Moon,
      Ellipsis,
      ArrowRight,
      LogIn,
      Loader,
      UserRound,
      KeyRound,
      CircleAlert,
      EyeClosed,
      Eye,
      ArrowUp,
      ChevronLeft,
    }),
  ],
  exports: [LucideAngularModule],
})
export class LucideIconsModule {}
