class PromiseView {

  constructor(
    public promise: Promise<any>,
    public title: string,
    public view: string
  ) {}
}

export { PromiseView }
