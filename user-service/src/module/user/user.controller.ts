import { Body, Controller, Delete, Get, Param, Patch, Post, Query,} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign-in.dto';
import { ChangeBalanceDto } from './dto/change-balance.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('verification')
  verification(@Body() dto: SignInDto) {
  return this.userService.verification(
    dto.login,
    dto,);
  } 

  @Post('balance')
  changeBalance(@Body() dto: ChangeBalanceDto): Promise<void> {
  return this.userService.changeBalance(dto);
  }

  @Get()
  findAll(
  @Query() getUserFilterDto: GetUserFilterDto,
) {
  return this.userService.findAll(getUserFilterDto);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
