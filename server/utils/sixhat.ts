enum SixHats {
  RedHat = "Red",
  BlueHat = "Blue",
  WhiteHat = "White",
  BlackHat = "Black",
  GreenHat = "Green",
  YellowHat = "Yellow",
}

const getAssistantId = (hat: SixHats) => {
  switch(hat) {
    case SixHats.BlackHat: return "<<BLACK_HAT_ASSISTANT_ID>>";
    case SixHats.BlueHat: return "<<BLUE_HAT_ASSISTANT_ID>>";
    case SixHats.GreenHat: return "<<GREEN_HAT_ASSISTANT_ID>>";
    case SixHats.RedHat: return "<<RED_HAT_ASSISTANT_ID>>";
    case SixHats.WhiteHat: return "<<WHITE_HAT_ASSISTANT_ID>>";
    case SixHats.YellowHat: return "<<YELLOW_HAT_ASSISTANT_ID>>";
  }
};

export {
  SixHats,
  getAssistantId,
}
