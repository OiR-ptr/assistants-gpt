enum SixHats {
  RedHat = "Red",
  BlueHat = "Blue",
  WhiteHat = "White",
  BlackHat = "Black",
  GreenHat = "Green",
  YellowHat = "Yellow",
  SuperFast = "Fast"
}

const getAssistantId = (hat: SixHats) => {
  switch(hat) {
    case SixHats.BlackHat: return "<<BLACK_HAT_ASSISTANT_ID>>";
    case SixHats.BlueHat: return "<<BLUE_HAT_ASSISTANT_ID>>";
    case SixHats.GreenHat: return "<<GREEN_HAT_ASSISTANT_ID>>";
    case SixHats.RedHat: return "<<RED_HAT_ASSISTANT_ID>>";
    case SixHats.WhiteHat: return "<<WHITE_HAT_ASSISTANT_ID>>";
    case SixHats.YellowHat: return "<<YELLOW_HAT_ASSISTANT_ID>>";
    case SixHats.SuperFast: return "<<SUPER_FAST_ASSISTANT_ID>>";
  }
};

const getSixHats = (assistantId: string | null) => {
  switch(assistantId) {
    case "<<BLACK_HAT_ASSISTANT_ID>>":  return SixHats.BlackHat;
    case "<<BLUE_HAT_ASSISTANT_ID>>":   return SixHats.BlueHat;
    case "<<GREEN_HAT_ASSISTANT_ID>>":  return SixHats.GreenHat;
    case "<<RED_HAT_ASSISTANT_ID>>":    return SixHats.RedHat;
    case "<<WHITE_HAT_ASSISTANT_ID>>":  return SixHats.WhiteHat;
    case "<<YELLOW_HAT_ASSISTANT_ID>>": return SixHats.YellowHat;
    case "<<SUPER_FAST_ASSISTANT_ID>>": return SixHats.SuperFast;
  }
  return null;
}

export {
  SixHats,
  getAssistantId,
  getSixHats,
}
