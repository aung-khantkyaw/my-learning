import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('breed')
  findBreeds(): string {
    return "This action returns all cats' breeds";
  }

  // Request Object
  @Get('test-request-response-object')
  testRequestObject(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      message: `This action tests request object: method=${req.method}, url=${req.url}`,
    });
    // return `This action tests request object: method=${req.method}, url=${req.url}`;
  }

  // Resources
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  // Route wildcards
  @Get('abcd/*')
  findWildcard(): string {
    return 'This action handles wildcard routes';
  }

  // Status code
  @Get('http-status')
  @HttpCode(404)
  getHttpStatus(): string {
    return 'This action returns a 404 status code';
  }

  // Response headers
  @Get('response-header')
  @Header('Cache-Control', 'no-store')
  getResponseHeader(): string {
    return 'This action handles Cache Control as no-store with response header';
  }

  // Redirection
  @Get('redirect-to-nestjs')
  @Redirect('https://nestjs.com', 301)
  getDocs(@Query('version') version: any) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
    return { url: 'https://nestjs.com' };
  }

  // Route parameters
  @Get('cat_id/:id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  // Asynchronicity
  @Get()
  async asynchronous(): Promise<any[]> {
    return await Promise.resolve([]);
  }

  @Get()
  observableStreams(): Observable<any[]> {
    return of([]);
  }

  // Request payloads
  @Post('request-payloads')
  requestPayloads(@Body() CreateCatDto: CreateCatDto) {
    return `This action adds a new cat by ${JSON.stringify(CreateCatDto)}`;
  }

  // Query parameters
  @Get('query-parameters')
  queryParameter(@Query('age') age: number, @Query('breed') breed: string) {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }
}
