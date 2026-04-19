const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response) {
if (!response.ok) {
  const errorText = await response.text();
  throw new Error(`Request failed: ${response.status} - ${errorText}`);
}

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
export async function createWeeklyPlan(payload) {
  const response = await fetch(`${API_BASE_URL}/api/WeeklyPlans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}
export async function getWeeklyPlans() {
  const response = await fetch(`${API_BASE_URL}/api/WeeklyPlans`);
  return handleResponse(response);
}

export async function getPriorities(weeklyPlanId) {
  const response = await fetch(
    `${API_BASE_URL}/api/weeklyplans/${weeklyPlanId}/priorities`
  );
  return handleResponse(response);
}

export async function createPriority(weeklyPlanId, payload) {
  const response = await fetch(
    `${API_BASE_URL}/api/weeklyplans/${weeklyPlanId}/priorities`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
}

export async function togglePriority(weeklyPlanId, priorityId) {
  const response = await fetch(
    `${API_BASE_URL}/api/weeklyplans/${weeklyPlanId}/priorities/${priorityId}/complete`,
    {
      method: "PATCH",
    }
  );

  return handleResponse(response);
}

export async function deletePriority(weeklyPlanId, priorityId) {
  const response = await fetch(
    `${API_BASE_URL}/api/weeklyplans/${weeklyPlanId}/priorities/${priorityId}`,
    {
      method: "DELETE",
    }
  );

  return handleResponse(response);
}

export async function getTasks(weeklyPlanId) {
  const response = await fetch(
    `${API_BASE_URL}/api/weeklyplans/${weeklyPlanId}/tasks`
  );
  return handleResponse(response);
}

export async function createTask(weeklyPlanId, payload) {
  const response = await fetch(
    `${API_BASE_URL}/api/weeklyplans/${weeklyPlanId}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
}

export async function updateTask(weeklyPlanId, taskId, payload) {
  const response = await fetch(
    `${API_BASE_URL}/api/weeklyplans/${weeklyPlanId}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
}

export async function deleteTask(weeklyPlanId, taskId) {
  const response = await fetch(
    `${API_BASE_URL}/api/weeklyplans/${weeklyPlanId}/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );

  return handleResponse(response);
}

// Add Today Api function
export async function getTodayView(weeklyPlanId) {
  const response = await fetch(
    `${API_BASE_URL}/api/weeklyplans/${weeklyPlanId}/today`
  );
  return handleResponse(response);
}

export async function createMode(payload) {
  const response = await fetch(`${API_BASE_URL}/api/mode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function getCurrentMode() {
  const response = await fetch(`${API_BASE_URL}/api/mode/current`);
  return handleResponse(response);
}

// Add function to get focus session Api
export async function startFocusSession(taskItemId, durationMinutes = 25) {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${taskItemId}/focus-sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ durationMinutes }),
  });

  return handleResponse(res);
}

export async function getFocusSessions(taskItemId) {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${taskItemId}/focus-sessions`);
  return handleResponse(res);
}

export async function completeFocusSession(taskItemId, sessionId) {
  const res = await fetch(
    `${API_BASE_URL}/api/tasks/${taskItemId}/focus-sessions/${sessionId}/complete`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endTime: new Date().toISOString(),
      }),
    }
  );

  return handleResponse(res);
}