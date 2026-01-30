export function ok(data) {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

export function err(message) {
  return { isError: true, content: [{ type: "text", text: message }] };
}
