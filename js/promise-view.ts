class PromiseView {

  constructor(
    public promise: Promise<any>,
    public title: string,
    public context: any,
    public view: string
  ) {}
}

export { PromiseView }
