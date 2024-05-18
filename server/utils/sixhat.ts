enum SixHats {
  RedHat = "Red",
  BlueHat = "Blue",
  WhiteHat = "White",
  BlackHat = "Black",
  GreenHat = "Green",
  YellowHat = "Yellow",
  SuperFast = "Fast",
  Baton = "Baton",
}

const getAssistantId = (hat: SixHats) => {
  switch(hat) {
    case SixHats.BlackHat: return "asst_USfJ3FwOiftcumZDWD0d9V1V";
    case SixHats.BlueHat: return "asst_GG6j7LY009d6Pc6GrOG2BxE3";
    case SixHats.GreenHat: return "asst_vIF0PIj82PM4BCgOiKgX6VH6";
    case SixHats.RedHat: return "asst_OaNxBB8zX9Y7JXc9LLxQyBgA";
    case SixHats.WhiteHat: return "asst_hqp7UlWYwVH9jw7V9RcgsNIu";
    case SixHats.YellowHat: return "asst_ALBtxiI4J7dvN4ZMwf3qr4mK";
    case SixHats.SuperFast: return "asst_14xe9KDigGwOnv1vAG7eDqBr";
    case SixHats.Baton: return "asst_nZloOOY5cSTkKHI6kOuoFGOU";
  }
};

const getSixHats = (assistantId: string | null) => {
  switch(assistantId) {
    case "asst_USfJ3FwOiftcumZDWD0d9V1V": return SixHats.BlackHat;
    case "asst_GG6j7LY009d6Pc6GrOG2BxE3": return SixHats.BlueHat;
    case "asst_vIF0PIj82PM4BCgOiKgX6VH6": return SixHats.GreenHat;
    case "asst_OaNxBB8zX9Y7JXc9LLxQyBgA": return SixHats.RedHat;
    case "asst_hqp7UlWYwVH9jw7V9RcgsNIu": return SixHats.WhiteHat;
    case "asst_ALBtxiI4J7dvN4ZMwf3qr4mK": return SixHats.YellowHat;
    case "asst_14xe9KDigGwOnv1vAG7eDqBr": return SixHats.SuperFast;
    case "asst_nZloOOY5cSTkKHI6kOuoFGOU": return SixHats.Baton;
  }
  return null;
}

export {
  SixHats,
  getAssistantId,
  getSixHats,
}
