describe("Task security guard", () => {
  test("NewTask_ShouldNotBeCompleted", () => {
    const task = {
      id: "1",
      title: "Przetestować bezpiecznik",
      completed: false,
    };

    expect(task.completed).toBe(false);
  });
});