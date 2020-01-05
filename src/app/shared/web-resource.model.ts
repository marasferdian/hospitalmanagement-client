export class WebResource {
  links: {href: string, rel: string}[];

  constructor(o: any) {
    this.links = o.links || [];
  }

  getUrl(rel: string = 'self'): string {
    const link = this.links.find(o => o.rel === rel);
    if (link) {
      return link.href;
    }
    return null;
  }
}
