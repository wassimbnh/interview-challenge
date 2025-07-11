import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleModule } from './sample/sample.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { MedicationsModule } from './medications/medications.module';
import { AssignmentsModule } from './assignments/assignments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SampleModule,
    PatientsModule,
    MedicationsModule,
    AssignmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
