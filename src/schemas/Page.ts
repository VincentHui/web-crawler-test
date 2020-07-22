import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Content {
  @Field(type => [String])
  links: string[] = [];
}
@ObjectType()
export default class Page {
  @Field()
  url!: string;
  @Field({ nullable: true })
  error?: string;
  @Field(type => Content, { nullable: true })
  content!: Content;
}
@ObjectType()
export class BrokenLinks {
  @Field()
  link!: string;
  @Field()
  error?: string;
  @Field()
  status?: string;
}
