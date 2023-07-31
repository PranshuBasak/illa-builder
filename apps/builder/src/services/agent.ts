import { builderRequest, directRequest } from "@/api/http"
import { Agent, AgentRaw, MarketplaceInfo } from "@/redux/aiAgent/aiAgentState"

export interface TeamAgentListData {
  aiAgentList: Agent[]
  totalAIAgentCount: number
}

export enum SortOptions {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export const fetchTeamAgentList = (
  sortBy: SortOptions = SortOptions.ID,
  signal?: AbortSignal,
) => {
  return builderRequest<TeamAgentListData>(
    {
      url: `/AIAgent/list/sortBy/${sortBy}`,
      method: "GET",
      signal,
    },
    {
      needTeamID: true,
    },
  )
}

// Search AI Agent By Keywords
export const fetchTeamAgentByKeywords = (
  sortBy: SortOptions = SortOptions.ID,
  keywords: string,
  signal?: AbortSignal,
) => {
  return builderRequest<TeamAgentListData>(
    {
      url: `/AIAgent/list/sortBy/${sortBy}/like`,
      method: "GET",
      params: {
        keywords,
      },
      signal,
    },
    {
      needTeamID: true,
    },
  )
}

export interface AgentProduct {
  aiAgent: Agent
  marketplace: MarketplaceInfo
}

export interface MarketAgentListData {
  products: AgentProduct[]
  total: number
  pageSize: number
  pageIndex: 1
}

export interface ForkAgentResponse {
  aiAgentID: string
}

export const forkAIAgentToTeam = (aiAgentID: string, teamID: string) => {
  return directRequest<ForkAgentResponse>({
    url: `/AIAgent/${aiAgentID}/forkTo/teams/${teamID}`,
    method: "POST",
  })
}

export const fetchAgentDetail = (aiAgentID: string, signal?: AbortSignal) => {
  return builderRequest<Agent>(
    {
      url: `/AIAgent/${aiAgentID}`,
      method: "GET",
      signal,
    },
    {
      needTeamID: true,
    },
  )
}

export const putAgentDetail = (aiAgentID: string, agentRaw: AgentRaw) => {
  return builderRequest<Agent, AgentRaw>(
    {
      url: `/AIAgent/${aiAgentID}`,
      method: "PUT",
      data: agentRaw,
    },
    {
      needTeamID: true,
    },
  )
}

export const createAgent = (agentRaw: AgentRaw) => {
  return builderRequest<Agent, AgentRaw>(
    {
      url: `/AIAgent`,
      method: "POST",
      data: agentRaw,
    },
    {
      needTeamID: true,
    },
  )
}

// send raw without variables
export const generateDescription = (prompt: string) => {
  return builderRequest<{ payload: string }, { prompt: string }>(
    {
      url: `/AIAgent/generatePromptDescription`,
      method: "POST",
      data: {
        prompt: prompt,
      },
    },
    {
      needTeamID: true,
    },
  )
}
