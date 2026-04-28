let cachedGithubStats = null;

function startOfYearUtc() {
  const year = new Date().getUTCFullYear();
  return `${year}-01-01T00:00:00Z`;
}

function endOfYearUtc() {
  const year = new Date().getUTCFullYear();
  return `${year}-12-31T23:59:59Z`;
}

export async function fetchGithubStats() {
  const username = process.env.GITHUB_USERNAME || "choi9970";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN이 설정되지 않았습니다.");
  }

  const query = `
    query PortfolioStats($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        login
        followers {
          totalCount
        }
        repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
        }
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              firstDay
              contributionDays {
                contributionCount
                contributionLevel
                date
              }
            }
          }
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalRepositoryContributions
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "portfolio-site",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: startOfYearUtc(),
        to: endOfYearUtc(),
      },
    }),
  });

  const payload = await response.json();

  if (!response.ok || payload.errors?.length) {
    const errorMessage = payload.errors?.[0]?.message || "GitHub API 호출에 실패했습니다.";
    throw new Error(errorMessage);
  }

  const user = payload.data?.user;
  const collection = user?.contributionsCollection;
  const calendar = collection?.contributionCalendar;
  const year = new Date().getFullYear();

  return {
    summary: {
      username: user.login,
      followers: user.followers.totalCount,
      publicRepositories: user.repositories.totalCount,
      totalContributions: calendar.totalContributions,
      totalCommitContributions: collection.totalCommitContributions,
      totalIssueContributions: collection.totalIssueContributions,
      totalPullRequestContributions: collection.totalPullRequestContributions,
      totalPullRequestReviewContributions: collection.totalPullRequestReviewContributions,
      totalRepositoryContributions: collection.totalRepositoryContributions,
      yearLabel: `${year} Contributions`,
      fetchedAt: new Date().toISOString(),
    },
    calendar: {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    },
  };
}

export async function getGithubStatsWithCache() {
  const now = Date.now();

  if (cachedGithubStats && now - cachedGithubStats.cachedAt < 10 * 60 * 1000) {
    return cachedGithubStats.data;
  }

  const data = await fetchGithubStats();
  cachedGithubStats = {
    cachedAt: now,
    data,
  };

  return data;
}
