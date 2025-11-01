import { NgModule } from '@angular/core';
import {
  AlignJustify,
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
} from 'lucide-angular';

@NgModule({
  declarations: [],
  imports: [
    LucideAngularModule.pick({
      Search,
      SquarePen,
      AlignJustify,
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
    }),
  ],
  exports: [LucideAngularModule],
})
export class LucideIconsModule {}
