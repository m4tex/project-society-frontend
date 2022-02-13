class Theme {
    backgroundColor:string
    primaryColor:string
    secondaryColor:string
    tertiaryColor:string
    interactableColor:string
    accentColor:string
    attentionColor:string
    setTheme: (index:number) => void

    constructor(...[bg, pri, sec, ter, inter, accent, attention] : string[]) {
        this.backgroundColor = bg;
        this.primaryColor = pri;
        this.secondaryColor = sec;
        this.tertiaryColor = ter;
        this.interactableColor = inter;
        this.accentColor = accent;
        this.attentionColor = attention;
        this.setTheme = (index) => null;
    }
}

export default Theme;