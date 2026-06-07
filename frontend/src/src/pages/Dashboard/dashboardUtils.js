export function filterBookings(bookings, query, filter) {
  const normalizedQuery = query.trim().toLowerCase();

  return bookings.filter((booking) => {
    const matchesQuery =
      !normalizedQuery ||
      [
        booking.client,
        booking.destination,
        booking.interest,
        booking.tier,
        booking.requestId,
        booking.travelers,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));

    const matchesFilter = filter === "all" ? true : booking.status === filter;

    return matchesQuery && matchesFilter;
  });
}

export function filterPackages(packages, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return packages.filter(
    (travelPackage) =>
      !normalizedQuery ||
      [
        travelPackage.title,
        travelPackage.place,
        travelPackage.status,
        travelPackage.category,
        travelPackage.duration,
      ].some((value) => value.toLowerCase().includes(normalizedQuery))
  );
}

export function filterMessages(messages, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return messages.filter(
    (message) =>
      !normalizedQuery ||
      [message.from, message.subject, message.preview].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
  );
}

export function getBookingStats(bookings) {
  return {
    all: bookings.length,
    pending: bookings.filter((booking) => booking.status === "pending").length,
    review: bookings.filter((booking) => booking.status === "review").length,
  };
}
