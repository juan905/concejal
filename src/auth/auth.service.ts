import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){

  }

 async create(createUserDto: CreateUserDto) {
  const {password, ...userData} = createUserDto
   try {
    const user = this.userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, 10)
    });

    await this.userRepository.save(user)
    delete user.password

    return user;

   } catch (error) {
    this.errorServer(error);
    
   }
  }


  async login(loginUserDto: LoginUserDto){
   const { password, identificacion} = loginUserDto;

   const user = await this.userRepository.findOne({
    where: {identificacion},
    select: {identificacion: true, password: true, roles: true}
   })

   if (!user) 
    throw new UnauthorizedException("Usuario y contraseña incorrectos 1");

    if (!bcrypt.compareSync(password, user.password)) 
    throw new UnauthorizedException("Usuario y contraseña incorrectos 2");

   return user

  }

   /**
   * Funcion para detectar el error
   * @param error 
   */
   errorServer(error: any){
    if (error) 
    throw new BadRequestException(error)
    

    if (error.code === '23505') 
    throw new BadRequestException(error.detail)
    this.logger.error(error)
    throw new InternalServerErrorException('Error inesperado, verifique los logs del servidor');
  }
  
}
