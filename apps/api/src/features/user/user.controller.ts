import type { Request, Response } from "express";

export const Userhome = (req: Request, res: Response) => {
  const { userId } = req.params;

  res.status(200).json({
    success: true,
    message: `User ID: ${userId}`,
  });
};
