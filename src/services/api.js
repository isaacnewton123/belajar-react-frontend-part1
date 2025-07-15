const API_URL = "https://fidodating.xyz/api/todos";

export const getTodos = async () => {
  try {
    const respond = await fetch(API_URL);
    if (!respond.ok)
      throw new Error(`tidak dapat mengambil data ${respond.status}`);

    return await respond.json();
  } catch (error) {
    console.log("gagal mengambil data", error);
    throw error;
  }
};

export const createTodo = async (newTodo) => {
  try {
    const respond = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (!respond.ok) throw new Error(`error : ${respond.status}`);

    return await respond.json();
  } catch (error) {
    console.log("tidak mengirim data", error);
    throw error;
  }
};

export const updateTodo = async (item) => {
  try {
    const respond = await fetch(`${API_URL}/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!respond.ok) throw new Error(`error : ${respond.status}`);

    return await respond.json();
  } catch (error) {
    console.log("tidak update data", error);
    throw error;
  }
};

export const updateTodoComplete = async (item) => {
  try {
    const respond = await fetch(`${API_URL}/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !item.completed,
      }),
    });
    if (!respond.ok) throw new Error(`error : ${respond.status}`);

    return respond.json();
  } catch (error) {
    console.error("gagal mengubah data", error);
    throw error;
  }
};

export const deleteTodo = async (item) => {
  try {
    const respond = await fetch(`${API_URL}/${item._id}`, {
      method: "DELETE",
    });
    if (!respond.ok) throw new Error(`error : ${respond.status}`);

    return { success: true, id: item };
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw error;
  }
};