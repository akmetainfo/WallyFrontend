const TransactionHelper = {
  isDebet(info, accountId) {
    return info.sourceId === accountId;
  },
  isCredit(info, accountId) {
    return info.destinationId === accountId;
  },
  getDebet(info, accountId) {
    return this.isDebet(info, accountId) ? info.amountSource : "";
  },
  getCredit(info, accountId) {
    return this.isCredit(info, accountId) ? info.amountDestination : "";
  },
  getCorrespondent(info, accountId) {
    if (this.isDebet(info, accountId)) {
      if (info.destinationIsCorrespondent) {
        // Расход
        return info.destinationTitle;
      }

      return `перевод на ${info.destinationTitle}`;
    }

    if (this.isCredit(info, accountId)) {
      if (info.sourceIsCorrespondent) {
        // Доход
        return info.sourceTitle;
      }

      return `перевод с ${info.sourceTitle}`;
    }

    throw new Error("unknown correspondent type");
  }
};

export default TransactionHelper;
