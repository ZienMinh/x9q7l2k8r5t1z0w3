// Create Promise.allSettled polyfill
Promise.allSettled =
  Promise.allSettled ||
  ((promises: Promise<any>[]) =>
    Promise.all(
      promises.map(promise =>
        promise
          .then(value => ({
            status: 'fulfilled',
            value,
          }))
          .catch(reason => ({
            status: 'rejected',
            reason,
          })),
      ),
    ));

export {};
