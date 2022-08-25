import { Membership } from '../models';
import { MembershipInput, MembershipOutput } from '../models/Membership';

export const create = async (payload: MembershipInput): Promise<MembershipOutput> => {
  const session = await Membership.create(payload);
  return session;
};

export const deleteById = async (userId: any): Promise<boolean> => {
  const deletedSession = await Membership.destroy({
    where: { userId },
  });
  return !!deletedSession;
};
