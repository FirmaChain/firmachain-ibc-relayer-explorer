export const MY_QUERY = `
  query MyQuery {
    message(
      where: { type: { _in: ["ibc.core.client.v1.MsgUpdateClient", "ibc.applications.transfer.v1.MsgTransfer"] } },
      limit: 5,
      order_by: { height: desc }
    ) {
      index
      height
      involved_accounts_addresses
      transaction_hash
      type
      transaction {
        messages
        success
        logs
      }
    }
  }
`;
