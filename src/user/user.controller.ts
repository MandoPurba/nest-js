import { UserService } from './user.service';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from './../auth/decorator';
import { UserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User /*@GetUser('id') userId: number */) {
    return user;
  }

  @Get('me/bookmarks')
  getBookmarkByUser(@GetUser('id') userId: number) {
    return this.userService.getBookmarks(userId);
  }

  @Patch('edit')
  editUser(@GetUser('id') userId: number, @Body() dto: UserDto) {
    return this.userService.editUser(userId, dto);
  }
}
