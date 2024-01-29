from fastapi import FastAPI
import numpy as np
from numpy import dot
from numpy.linalg import norm
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def cosine_similarity(compare, desired):
    return dot(compare, desired) / (norm(compare) * norm(desired))


def generate_skills(size, with_zero=True):
    skill_scores = [0, 20, 40, 60, 80, 100] if with_zero else [20, 40, 60, 80, 100]

    return np.random.choice(skill_scores, size).tolist()


@app.get("/get_users_skills")
async def get_users_skills(num_users: int, num_all_skills: int):
    desired_skills = generate_skills(num_all_skills, with_zero=False)

    users_skills = [
        generate_skills(num_all_skills) for _ in range(num_users)
    ]

    sorted_users = sorted(
        users_skills,
        key=lambda x: cosine_similarity(x, desired_skills),
        reverse=True
    )

    return {
        "desired": desired_skills,
        "users": np.array([
            {
                "skills": skills,
                "score": cosine_similarity(np.array(skills), np.array(desired_skills)),
            } for skills in sorted_users
        ]).tolist()
    }
